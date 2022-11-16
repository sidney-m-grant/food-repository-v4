import React from "react";
import { useState as useStateHookState } from "@hookstate/core";
import { StepBlock, store, RecipeStep } from "../../util/store";

interface Props {
  inputStep: RecipeStep;
  inputStepBlock: StepBlock;
  recipeInputType: "input" | "edited";
}
// the "input" here refers to whatever were working on, whether inputing a new recipe or editing a recipe

const InputStep: React.FC<Props> = ({
  recipeInputType,
  inputStep,
  inputStepBlock,
}) => {
  const state = useStateHookState(store);

  const handleEditedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.editedRecipe.stepList[inputStepBlock.blockNumber].steps[
      inputStep.stepNumber - 1
    ].stepText.set(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.inputRecipe.stepList[inputStepBlock.blockNumber].steps[
      inputStep.stepNumber - 1
    ].stepText.set(e.target.value);
  };

  return (
    <div>
      {recipeInputType === "edited" ? (
        <input
          onChange={handleEditedChange}
          value={state.editedRecipe.stepList[inputStepBlock.blockNumber].steps[
            inputStep.stepNumber - 1
          ].stepText.get()}
        ></input>
      ) : (
        <input
          onChange={handleInputChange}
          value={state.inputRecipe.stepList[inputStepBlock.blockNumber].steps[
            inputStep.stepNumber - 1
          ].stepText.get()}
        ></input>
      )}
    </div>
  );
};

export default InputStep;
