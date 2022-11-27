import React from "react";
import { useState as useStateHookState } from "@hookstate/core";
import { store } from "../../util/store";
import CurrentIngredientBlock from "../currentIngredientBlock/CurrentIngredientBlock";
import CurrentStepBlock from "../currentStepBlock/CurrentStepBlock";
import CurrentRecipeHeader from "../currentRecipeHeader/CurrentRecipeHeader";
import styled from "styled-components";

export const Current_Recipe_Container = styled.div`
  display: grid;
  margin-left: 250 px;
  margin-top: 30px;
  grid-template-columns: 1fr 2fr;
`;

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
      <Current_Recipe_Container>
        <ul>{listIngredients}</ul>
        <ul>{listSteps}</ul>
      </Current_Recipe_Container>
    </div>
  );
};

export default CurrentRecipeContainer;
