import React from "react";
import { useState as useStateHookState, none } from "@hookstate/core";
import { store } from "../../util/store";
import { useAuth } from "../../../context/AuthContext";
import InputStepBlock from "../inputStepBlock/InputStepBlock";
import InputIngredientBlock from "../inputIngredientBlock/InputIngredientBlock";
import styles from "./MainInputComponent.module.css";

interface Props {
  recipeInputType: "edited" | "input";
}

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
    <div className={styles.MainInputComponent}>
      <ul className={styles.InputIngredientBlock}>
        {recipeInputType === "edited"
          ? listEditedIngredientBlocks
          : listInputIngredientBlocks}
      </ul>
      <ul className={styles.InputStepBlock}>
        {recipeInputType === "edited"
          ? listEditedStepBlocks
          : listInputStepBlocks}
      </ul>
      <img
        src={state.inputImagePreview.get()}
        style={{ height: 100, width: 100 }}
      ></img>
    </div>
  );
};

export default MainInputComponent;
