import React from "react";
import { useState as useStateHookState, none } from "@hookstate/core";
import { store } from "../../util/store";
import { useAuth } from "../../../context/AuthContext";
import InputStepBlock from "../inputStepBlock/InputStepBlock";
import InputIngredientBlock from "../inputIngredientBlock/InputIngredientBlock";
import styled from "styled-components";

interface Props {
  recipeInputType: "edited" | "input";
}

export const Main_Input_Component = styled.div`
  border: 1px;
  border-style: solid;
  display: grid;
  grid-template-columns: 1 fr 2fr;
`;

export const Input_Ingredient_Block = styled.ul`
  border: 1px;
  border-style: solid;
  grid-column: 1 / 2;
`;

export const Input_Step_Block = styled.ul`
  border: 1px;
  border-style: solid;
  grid-column: 2;
`;

const MainInputComponent: React.FC<Props> = ({ recipeInputType }) => {
  const state = useStateHookState(store);
  const { user } = useAuth();

  const listEditedStepBlocks = state.editedRecipe.stepList
    .get()
    .map((stepBlock) => {
      return (
        <li key={stepBlock.blockNumber}>
          <InputStepBlock
            inputStepBlock={stepBlock}
            recipeInputType={recipeInputType}
            key={stepBlock.blockNumber}
          />
        </li>
      );
    });
  const listEditedIngredientBlocks = state.editedRecipe.ingredientList
    .get()
    .map((ingredientBlock) => {
      return (
        <li key={ingredientBlock.blockNumber}>
          <InputIngredientBlock
            inputIngredientBlock={ingredientBlock}
            recipeInputType={recipeInputType}
            key={ingredientBlock.blockNumber}
          />
        </li>
      );
    });
  const listInputStepBlocks = state.inputRecipe.stepList
    .get()
    .map((stepBlock) => {
      return (
        <li key={stepBlock.blockNumber}>
          <InputStepBlock
            inputStepBlock={stepBlock}
            recipeInputType={recipeInputType}
            key={stepBlock.blockNumber}
          />
        </li>
      );
    });
  const listInputIngredientBlocks = state.inputRecipe.ingredientList
    .get()
    .map((ingredientBlock) => {
      return (
        <li key={ingredientBlock.blockNumber}>
          <InputIngredientBlock
            inputIngredientBlock={ingredientBlock}
            recipeInputType={recipeInputType}
            key={ingredientBlock.blockNumber}
          />
        </li>
      );
    });

  return (
    <Main_Input_Component>
      <Input_Ingredient_Block>
        {recipeInputType === "edited"
          ? listEditedIngredientBlocks
          : listInputIngredientBlocks}
      </Input_Ingredient_Block>
      <Input_Step_Block>
        {recipeInputType === "edited"
          ? listEditedStepBlocks
          : listInputStepBlocks}
      </Input_Step_Block>
      <img
        src={state.inputImagePreview.get()}
        style={{ height: 100, width: 100 }}
      ></img>
    </Main_Input_Component>
  );
};

export default MainInputComponent;
