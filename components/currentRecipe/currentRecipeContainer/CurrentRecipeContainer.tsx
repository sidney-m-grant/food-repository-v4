import React from "react";
import { useState as useStateHookState } from "@hookstate/core";
import { store } from "../../util/store";
import CurrentIngredientBlock from "../currentIngredientBlock/CurrentIngredientBlock";
import CurrentStepBlock from "../currentStepBlock/CurrentStepBlock";
import styles from "./CurrentRecipeContainer.module.css";

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
    <div className={styles.CurrentRecipeContainer}>
      <ol>{listIngredients}</ol>
      <ol>{listSteps}</ol>
    </div>
  );
};

export default CurrentRecipeContainer;
