import React, { useEffect, useState } from "react";
import { useState as useStateHookState } from "@hookstate/core";
import { store, Recipe } from "../../util/store";
import { useAuth } from "../../../context/AuthContext";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";
import RecipeListComponent from "../recipeListComponent/RecipeListComponent";
import styles from "./RecipeListSidebar.module.css";
import InputSidebarFunctions from "../../inputComponents/inputSidebar/inputSidebarFunctions/InputSidebarFunctions";
import CookBooks from "../cookBooks/CookBooks";

const RecipeListSidebar = () => {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [openSubMenu, setOpenSubMenu] = useState<string>("");
  const { user } = useAuth();

  useEffect(() => {
    const getRecipes = async () => {
      const recipes = await getDocs(
        collection(db, user?.email, "recipeCollection", "recipes")
      );
      const tempArray: any = recipes.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      const recipeArray: Recipe[] = [];
      tempArray.forEach((recipe: Recipe) => {
        const temp: Recipe = {
          recipeName: recipe.recipeName,
          stepList: recipe.stepList,
          ingredientList: recipe.ingredientList,
          docId: recipe.docId,
          imgPath: recipe.imgPath,
          prepTime: recipe.prepTime,
          activeCookingTime: recipe.activeCookingTime,
          totalTime: recipe.totalTime,
          servesAmount: recipe.servesAmount,
          source: recipe.source,
          briefDescription: recipe.briefDescription,
        };
        recipeArray.push(temp);
      });
      setAllRecipes(recipeArray);
    };
    getRecipes();
  }, [user?.email]);

  const handleEditToolsClick = () => {
    if (openSubMenu !== "editTools") {
      setOpenSubMenu("editTools");
    } else {
      setOpenSubMenu("");
    }
  };

  const handleSearchClick = () => {
    if (openSubMenu !== "search") {
      setOpenSubMenu("search");
    } else {
      setOpenSubMenu("");
    }
  };

  const handleCookBooksClick = () => {
    if (openSubMenu !== "cookBooks") {
      setOpenSubMenu("cookBooks");
    } else {
      setOpenSubMenu("");
    }
  };

  return (
    <div className={styles.RecipeListSidebar}>
      <button onClick={handleEditToolsClick}>Edit Tools</button>
      {openSubMenu === "editTools" ? (
        <InputSidebarFunctions recipeInputType="edited" />
      ) : null}

      <button onClick={handleSearchClick}>Search</button>
      {openSubMenu === "search" ? (
        <RecipeListComponent allRecipes={allRecipes} />
      ) : null}

      <button onClick={handleCookBooksClick}>Cook Books</button>
      {openSubMenu === "cookBooks" ? <CookBooks /> : null}
    </div>
  );
};

export default RecipeListSidebar;
