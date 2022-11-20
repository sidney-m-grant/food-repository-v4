import React from "react";
import { useState as useStateHookState } from "@hookstate/core";
import { store } from "../../util/store";
import CurrentIngredientBlock from "../currentIngredientBlock/CurrentIngredientBlock";
import CurrentStepBlock from "../currentStepBlock/CurrentStepBlock";
import styles from "./CurrentRecipeContainer.module.css";
import CurrentRecipeHeader from "../currentRecipeHeader/CurrentRecipeHeader";

const CurrentRecipeContainer = () => {
  const state = useStateHookState(store);

  const listIngredients = state.currentRecipe.ingredientList
    .get()
    .map((ingredientBlock) => {
      return (
        <li key={ingredientBlock.blockNumber}>
          <CurrentIngredientBlock
            key={ingredientBlock.blockNumber}
            ingredientBlock={ingredientBlock}
          />
        </li>
      );
    });

  const listSteps = state.currentRecipe.stepList.get().map((stepBlock) => {
    return (
      <li key={stepBlock.blockNumber}>
        <CurrentStepBlock key={stepBlock.blockNumber} stepBlock={stepBlock} />
      </li>
    );
  });

  return (
    <div>
      <CurrentRecipeHeader />
      <div className={styles.CurrentRecipeContainer}>
        <ul>{listIngredients}</ul>
        <ul>{listSteps}</ul>
      </div>
    </div>
  );
};

export default CurrentRecipeContainer;
