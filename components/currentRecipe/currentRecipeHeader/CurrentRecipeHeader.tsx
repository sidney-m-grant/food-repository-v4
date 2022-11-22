import React from "react";
import { useState as useStateHookState } from "@hookstate/core";
import { store } from "../../util/store";

const CurrentRecipeHeader = () => {
  const state = useStateHookState(store);

  return (
    <div>
      <span>
        Active Cooking Time: {state.currentRecipe.activeCookingTime.get()}
      </span>
      <span>Total Time: {state.currentRecipe.totalTime.get()}</span>
      <span>Prep Time: {state.currentRecipe.prepTime.get()}</span>
      <span>Source: {state.currentRecipe.source.get()}</span>
      <span>Serves: {state.currentRecipe.servesAmount.get()}</span>
      <span>
        Brief Description: {state.currentRecipe.briefDescription.get()}
      </span>
      <span>Name: {state.currentRecipe.recipeName.get()}</span>
      <img
        src={state.currentRecipe.imgPath.get()}
        style={{ height: 150, width: 150 }}
      ></img>
    </div>
  );
};

export default CurrentRecipeHeader;
