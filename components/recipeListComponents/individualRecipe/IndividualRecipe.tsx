import React from "react";
import { Recipe, store } from "../../util/store";
import { useState as useStateHookState } from "@hookstate/core";

interface Props {
  recipe: Recipe;
}

const IndividualRecipe: React.FC<Props> = ({ recipe }) => {
  const state = useStateHookState(store);

  const handleClick = () => {
    state.currentRecipe.set(recipe);
  };
  return <h5 onClick={handleClick}>{recipe.recipeName}</h5>;
};

export default IndividualRecipe;
