import React from "react";
import { Recipe, store } from "../../util/store";
import { useState as useStateHookState } from "@hookstate/core";
import { DisplayType } from "../../../pages/RecipeList";

interface Props {
  recipe: Recipe;
  setDisplayType: React.Dispatch<React.SetStateAction<DisplayType>>;
}

const IndividualRecipe: React.FC<Props> = ({ recipe, setDisplayType }) => {
  const state = useStateHookState(store);

  const handleCurrentClick = () => {
    state.currentRecipe.set(recipe);
    setDisplayType("current");
  };

  const handleEditClick = () => {
    state.editedRecipe.set(recipe);
    setDisplayType("edited");
  };

  return (
    <>
      <h5 onClick={handleCurrentClick}>{recipe.recipeName}</h5>
      <button onClick={handleEditClick}>Edit</button>
    </>
  );
};

export default IndividualRecipe;