import React, { useState, useEffect } from "react";
import styled from "styled-components";
import type { Recipe } from "../util/store";
import type { OpenSubMenu } from "../recipeListComponents/recipeListSidebar/RecipeListSidebar";
import { useAuth } from "../../context/AuthContext";
import { useState as useStateHookState } from "@hookstate/core";
import { store } from "../util/store";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import CalendarSearchComponent from "../recipeListComponents/search/CalendarSearchComponent";
import CookBooks from "../recipeListComponents/cookBooks/CookBooks";
import CalendarRecipeList from "./CalendarRecipeList";

export const Calendar_Sidebar_Container = styled.div`
  height: 100%;
  width: 250px;
  position: fixed;
  left: 0;
  border: 1px;
  border-style: solid;
  top: 30px;
`;

export const Calendar_Sidebar_Label = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-style: solid;
  padding: 5px;
  margin: 5px;
`;

interface Props {
  setCurrentlyDragged: React.Dispatch<React.SetStateAction<string>>;
  setSelectedMeal: React.Dispatch<React.SetStateAction<string>>;
  selectedMeal: string;
}

const CalendarSidebar: React.FC<Props> = ({
  setCurrentlyDragged,
  setSelectedMeal,
  selectedMeal,
}) => {
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

  const handleSelectedMealClick = (e: React.FormEvent<HTMLInputElement>) => {
    setSelectedMeal(e.currentTarget.value);
  };

  return (
    <Calendar_Sidebar_Container>
      <div>
        <input
          type="radio"
          name="selectedMeal"
          value="breakfast"
          id="breakfast"
          checked={selectedMeal === "breakfast"}
          onChange={handleSelectedMealClick}
        ></input>
        <label htmlFor="breakfast">Breakfast</label>
        <input
          type="radio"
          name="selectedMeal"
          value="lunch"
          id="lunch"
          checked={selectedMeal === "lunch"}
          onChange={handleSelectedMealClick}
        ></input>
        <label htmlFor="lunch">Lunch</label>
        <input
          type="radio"
          name="selectedMeal"
          value="dinner"
          id="dinner"
          checked={selectedMeal === "dinner"}
          onChange={handleSelectedMealClick}
        ></input>
        <label htmlFor="dinner">Dinner</label>
      </div>
      <Calendar_Sidebar_Label onClick={handleSearchClick}>
        Search
      </Calendar_Sidebar_Label>
      {openSubMenu === "search" ? (
        <CalendarSearchComponent
          allRecipes={allRecipes}
          setCurrentlyDragged={setCurrentlyDragged}
        />
      ) : null}
      <br></br>
      <Calendar_Sidebar_Label onClick={handleCookBooksClick}>
        Cook Books
      </Calendar_Sidebar_Label>
      {openSubMenu === "cookBooks" ? (
        <CookBooks
          setSelectedCookBook={setSelectedCookBook}
          setOpenSubMenu={setOpenSubMenu}
        />
      ) : null}
      {selectedCookBook && selectedCookBook !== "All Recipes" ? (
        <CalendarRecipeList
          setCurrentlyDragged={setCurrentlyDragged}
          recipes={allRecipes.filter((recipe) => {
            recipe.cookBook === selectedCookBook;
          })}
        />
      ) : null}
      {selectedCookBook && selectedCookBook === "All Recipes" ? (
        <CalendarRecipeList
          setCurrentlyDragged={setCurrentlyDragged}
          recipes={allRecipes}
        />
      ) : null}
    </Calendar_Sidebar_Container>
  );
};

export default CalendarSidebar;
