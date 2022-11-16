import React from "react";
import { useState as useStateHookState } from "@hookstate/core";
import { store, Ingredient, IngredientBlock } from "../../util/store";
import styles from "./InputIngredient.module.css";

interface Props {
  inputIngredient: Ingredient;
  inputIngredientBlock: IngredientBlock;
  recipeInputType: "edited" | "input";
}

const InputIngredient: React.FC<Props> = ({
  inputIngredient,
  inputIngredientBlock,
  recipeInputType,
}) => {
  const state = useStateHookState(store);

  const handleChangeInputAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.inputRecipe.ingredientList[
      inputIngredientBlock.blockNumber
    ].ingredients[inputIngredient.id - 1].amount.set(e.target.value);
  };

  const handleChangeInputUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.inputRecipe.ingredientList[
      inputIngredientBlock.blockNumber
    ].ingredients[inputIngredient.id - 1].unit.set(e.target.value);
  };

  const handleChangeInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.inputRecipe.ingredientList[
      inputIngredientBlock.blockNumber
    ].ingredients[inputIngredient.id - 1].name.set(e.target.value);
  };

  const handleChangeEditedAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.editedRecipe.ingredientList[
      inputIngredientBlock.blockNumber
    ].ingredients[inputIngredient.id - 1].amount.set(e.target.value);
  };

  const handleChangeEditedUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.editedRecipe.ingredientList[
      inputIngredientBlock.blockNumber
    ].ingredients[inputIngredient.id - 1].unit.set(e.target.value);
  };

  const handleChangeEditedName = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.editedRecipe.ingredientList[
      inputIngredientBlock.blockNumber
    ].ingredients[inputIngredient.id - 1].name.set(e.target.value);
  };

  return (
    <div>
      {recipeInputType === "edited" ? (
        <input
          onChange={handleChangeEditedAmount}
          value={state.editedRecipe.ingredientList[
            inputIngredientBlock.blockNumber
          ].ingredients[inputIngredient.id - 1].amount.get()}
        ></input>
      ) : (
        <input
          onChange={handleChangeInputAmount}
          value={state.inputRecipe.ingredientList[
            inputIngredientBlock.blockNumber
          ].ingredients[inputIngredient.id - 1].amount.get()}
        ></input>
      )}

      {recipeInputType === "edited" ? (
        <input
          onChange={handleChangeEditedUnit}
          value={state.editedRecipe.ingredientList[
            inputIngredientBlock.blockNumber
          ].ingredients[inputIngredient.id - 1].unit.get()}
        ></input>
      ) : (
        <input
          onChange={handleChangeInputUnit}
          value={state.inputRecipe.ingredientList[
            inputIngredientBlock.blockNumber
          ].ingredients[inputIngredient.id - 1].unit.get()}
        ></input>
      )}

      {recipeInputType === "edited" ? (
        <input
          onChange={handleChangeEditedName}
          value={state.editedRecipe.ingredientList[
            inputIngredientBlock.blockNumber
          ].ingredients[inputIngredient.id - 1].name.get()}
        ></input>
      ) : (
        <input
          onChange={handleChangeInputName}
          value={state.inputRecipe.ingredientList[
            inputIngredientBlock.blockNumber
          ].ingredients[inputIngredient.id - 1].name.get()}
        ></input>
      )}
    </div>
  );
};

export default InputIngredient;
