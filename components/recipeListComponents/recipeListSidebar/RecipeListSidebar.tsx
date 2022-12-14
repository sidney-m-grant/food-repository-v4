import React, { useEffect, useState } from "react";
import { useState as useStateHookState } from "@hookstate/core";
import { store, Recipe } from "../../util/store";
import { useAuth } from "../../../context/AuthContext";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";
import RecipeListComponent from "../recipeListComponent/RecipeListComponent";
import styled from "styled-components";
import InputSidebarFunctions from "../../inputComponents/inputSideBar/inputSideBarFunctions/InputSideBarFunctions";
import CookBooks from "../cookBooks/CookBooks";
import SearchComponent from "../search/SearchComponent";
import { DisplayType } from "../../../pages/RecipeList";

export type OpenSubMenu = "search" | "cookBooks" | "editTools" | "";

export const Recipe_List_Sidebar_Container = styled.div`
  width: 250px;
  position: fixed;
  left: 0;
  border: 1px;
  border-style: solid;
  overflow-y: scroll;
  top: 30px;
  bottom: 0px;
`;

export const Recipe_List_Sidebar_Label = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-style: solid;
  padding: 5px;
  margin: 5px;
`;

interface Props {
  setDisplayType: React.Dispatch<React.SetStateAction<DisplayType>>;
}

const RecipeListSidebar: React.FC<Props> = ({ setDisplayType }) => {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [openSubMenu, setOpenSubMenu] = useState<OpenSubMenu>("");
  const [selectedCookBook, setSelectedCookBook] = useState<string>("");
  const { user } = useAuth();
  const state = useStateHookState(store);

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
      const globalIngredientArray: string[] = [];
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

      for (let i = 0; i < recipeArray.length; i++) {
        for (let j = 0; j < recipeArray[i].ingredientList.length; j++) {
          for (
            let k = 0;
            k < recipeArray[i].ingredientList[j].ingredients.length;
            k++
          ) {
            if (
              globalIngredientArray.includes(
                recipeArray[i].ingredientList[j].ingredients[k].name
              )
            ) {
              continue;
            }
            globalIngredientArray.push(
              recipeArray[i].ingredientList[j].ingredients[k].name
            );
          }
        }
      }
      state.globalIngredientList.set(globalIngredientArray);
      setAllRecipes(recipeArray);
      state.allRecipes.set(recipeArray);
    };
    getRecipes();
  }, [user?.email]);

  const handleEditToolsClick = () => {
    if (openSubMenu !== "editTools") {
      setOpenSubMenu("editTools");
      setSelectedCookBook("");
    } else {
      setOpenSubMenu("");
    }
  };

  const handleSearchClick = () => {
    if (openSubMenu !== "search") {
      setOpenSubMenu("search");
      setSelectedCookBook("");
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
    <Recipe_List_Sidebar_Container>
      <Recipe_List_Sidebar_Label onClick={handleEditToolsClick}>
        Edit Tools
      </Recipe_List_Sidebar_Label>
      {openSubMenu === "editTools" ? (
        <InputSidebarFunctions recipeInputType="edited" />
      ) : null}
      <br></br>
      <Recipe_List_Sidebar_Label onClick={handleSearchClick}>
        Search
      </Recipe_List_Sidebar_Label>
      {openSubMenu === "search" ? (
        <SearchComponent
          allRecipes={allRecipes}
          setDisplayType={setDisplayType}
        />
      ) : null}
      <br></br>
      <Recipe_List_Sidebar_Label onClick={handleCookBooksClick}>
        Cook Books
      </Recipe_List_Sidebar_Label>
      {openSubMenu === "cookBooks" ? (
        <CookBooks
          setSelectedCookBook={setSelectedCookBook}
          setOpenSubMenu={setOpenSubMenu}
        />
      ) : null}
      {selectedCookBook && selectedCookBook !== "All Recipes" ? (
        <RecipeListComponent
          recipes={allRecipes.filter((recipe) => {
            recipe.cookBook === selectedCookBook;
          })}
          setDisplayType={setDisplayType}
        />
      ) : null}
      {selectedCookBook && selectedCookBook === "All Recipes" ? (
        <RecipeListComponent
          recipes={allRecipes}
          setDisplayType={setDisplayType}
        />
      ) : null}
    </Recipe_List_Sidebar_Container>
  );
};

export default RecipeListSidebar;
