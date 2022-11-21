import React, { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import CurrentRecipeContainer from "../components/currentRecipe/currentRecipeContainer/CurrentRecipeContainer";
import RecipeListSidebar from "../components/recipeListComponents/recipeListSidebar/RecipeListSidebar";
import { useAuth } from "../context/AuthContext";
import { useState as useStateHookState } from "@hookstate/core";
import { store } from "../components/util/store";
import { db } from "../config/firebase";
import MainInputComponent from "../components/inputComponents/mainInputComponent/MainInputComponent";

export type DisplayType = "edited" | "current" | ""

const RecipeList = () => {
  const { user } = useAuth();
  const state = useStateHookState(store);
  const [displayType, setDisplayType] = useState<DisplayType>("");

  useEffect(() => {
    const getCookBooks = async () => {
      const snapshot = await getDoc(
        doc(db, user.email, "recipeCollection", "miscItems", "cookBookArray")
      );
      const cookBooks = snapshot.data()?.cookBookArray;
      state.cookBookList.set(cookBooks);
    };
    getCookBooks();
  }, [user.email]);

  return (
    <div className="recipe-container">
      <RecipeListSidebar setDisplayType={setDisplayType}/>
      {displayType === "edited" ? (
        <MainInputComponent recipeInputType="edited" />
      ) : null}
      {displayType === "current" ? <CurrentRecipeContainer /> : null}
    </div>
  );
};

export default RecipeList;
