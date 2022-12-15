import React from "react";
import { DisplayType } from "../../../pages/RecipeList";
import { Recipe } from "../../util/store";
import IndividualRecipe from "../individualRecipe/IndividualRecipe";
import CalendarIndividualRecipe from "../../calendarComponents/CalendarIndividualRecipe";
import { useRouter } from "next/router";

interface Props {
  recipes: Recipe[];
  setDisplayType?: React.Dispatch<React.SetStateAction<DisplayType>>;
}

const RecipeListComponent: React.FC<Props> = ({ recipes, setDisplayType }) => {
  const listRecipes = recipes.map((recipe) => {
    return (
      <li key={recipes.indexOf(recipe)}>
        <IndividualRecipe
          key={recipes.indexOf(recipe)}
          recipe={recipe}
          setDisplayType={setDisplayType}
        />
      </li>
    );
  });

  return <ul>{listRecipes}</ul>;
};

export default RecipeListComponent;
