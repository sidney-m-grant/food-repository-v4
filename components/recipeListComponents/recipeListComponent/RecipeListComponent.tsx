import React from "react";
import { Recipe } from "../../util/store";
import IndividualRecipe from "../individualRecipe/IndividualRecipe";

interface Props {
  allRecipes: Recipe[];
}

const RecipeListComponent: React.FC<Props> = ({ allRecipes }) => {
  const listRecipes = allRecipes.map((recipe) => {
    return (
      <li key={allRecipes.indexOf(recipe)}>
        <IndividualRecipe key={allRecipes.indexOf(recipe)} recipe={recipe} />
      </li>
    );
  });

  return <div>{allRecipes ? <ul>{listRecipes}</ul> : null}</div>;
};

export default RecipeListComponent;
