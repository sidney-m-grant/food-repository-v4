import React from "react";
import CalendarIndividualRecipe from "./CalendarIndividualRecipe";
import type { Recipe } from "../util/store";

interface Props {
  recipes: Recipe[];
  setCurrentlyDragged: React.Dispatch<React.SetStateAction<string>>;
}

const CalendarRecipeList: React.FC<Props> = ({
  recipes,
  setCurrentlyDragged,
}) => {
  const listRecipesCalendar = recipes.map((recipe) => {
    return (
      <li key={recipes.indexOf(recipe)}>
        <CalendarIndividualRecipe
          key={recipes.indexOf(recipe)}
          recipe={recipe}
          setCurrentlyDragged={setCurrentlyDragged}
        />
      </li>
    );
  });

  return <ul>{listRecipesCalendar}</ul>;
};

export default CalendarRecipeList;
