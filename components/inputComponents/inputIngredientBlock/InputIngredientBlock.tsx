import React from "react";
import { IngredientBlock, store } from "../../util/store";
import { useState as useStateHookState, none } from "@hookstate/core";
import InputIngredient from "../inputIngredient/InputIngredient";

interface Props {
  inputIngredientBlock: IngredientBlock;
  recipeInputType: "edited" | "input";
}

const InputIngredientBlock: React.FC<Props> = ({
  inputIngredientBlock,
  recipeInputType,
}) => {
  const state = useStateHookState(store);

  const listOfIngredients = inputIngredientBlock.ingredients.map(
    (ingredient) => {
      return (
        <li key={ingredient.id}>
          <InputIngredient
            inputIngredient={ingredient}
            inputIngredientBlock={inputIngredientBlock}
            key={ingredient.id}
            recipeInputType={recipeInputType}
          />
        </li>
      );
    }
  );

  const handleAddIngredient = () => {
    if (recipeInputType === "input") {
      const length =
        state.inputRecipe.ingredientList[inputIngredientBlock.blockNumber]
          .ingredients.length;
      state.inputRecipe.ingredientList[
        inputIngredientBlock.blockNumber
      ].ingredients[length].set({
        amount: "",
        name: "",
        unit: "",
        id: length + 1,
      });
    } else if (recipeInputType === "edited") {
      const length =
        state.editedRecipe.ingredientList[inputIngredientBlock.blockNumber]
          .ingredients.length;
      state.editedRecipe.ingredientList[
        inputIngredientBlock.blockNumber
      ].ingredients[length].set({
        amount: "",
        name: "",
        unit: "",
        id: length + 1,
      });
    }
  };

  const handleDeleteLastIngredient = () => {
    if (recipeInputType === "input") {
      const length =
        state.inputRecipe.ingredientList[inputIngredientBlock.blockNumber]
          .ingredients.length - 1;
      state.inputRecipe.ingredientList[
        inputIngredientBlock.blockNumber
      ].ingredients[length].set(none);
    } else if (recipeInputType === "edited") {
      const length =
        state.editedRecipe.ingredientList[inputIngredientBlock.blockNumber]
          .ingredients.length - 1;
      state.editedRecipe.ingredientList[
        inputIngredientBlock.blockNumber
      ].ingredients[length].set(none);
    }
  };

  const handleInputForChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.inputRecipe.ingredientList[inputIngredientBlock.blockNumber].for.set(
      e.target.value
    );
  };

  const handleEditedForChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.editedRecipe.ingredientList[inputIngredientBlock.blockNumber].for.set(
      e.target.value
    );
  };

  return (
    <div>
      {recipeInputType === "edited" ? (
        <div>
          <input
            onChange={handleEditedForChange}
            value={state.editedRecipe.ingredientList[
              inputIngredientBlock.blockNumber
            ].for.get()}
          ></input>
        </div>
      ) : (
        <div>
          <input
            onChange={handleInputForChange}
            value={state.inputRecipe.ingredientList[
              inputIngredientBlock.blockNumber
            ].for.get()}
          ></input>
        </div>
      )}
      <button onClick={handleAddIngredient}>Add Ingredient</button>
      <button onClick={handleDeleteLastIngredient}>Delete Ingredient</button>
      <ol>{listOfIngredients}</ol>
    </div>
  );
};

export default InputIngredientBlock;
