import React from "react";
import { store, StepBlock } from "../../util/store";
import { useState as useStateHookState, none } from "@hookstate/core";
import InputStep from "../inputStep/InputStep";

interface Props {
  inputStepBlock: StepBlock;
  recipeInputType: "edited" | "input";
}

const InputStepBlock: React.FC<Props> = ({
  inputStepBlock,
  recipeInputType,
}) => {
  const state = useStateHookState(store);

  const listOfRecipeSteps = inputStepBlock.steps.map((recipeStep) => {
    return (
      <li key={recipeStep.stepNumber}>
        <InputStep
          inputStep={recipeStep}
          inputStepBlock={inputStepBlock}
          recipeInputType={recipeInputType}
          key={recipeStep.stepNumber}
        />
      </li>
    );
  });

  const handleAddStep = () => {
    if (recipeInputType === "input") {
      console.log(state.inputImagePreview.get());
      const length =
        state.inputRecipe.stepList[inputStepBlock.blockNumber].steps.length;
      state.inputRecipe.stepList[inputStepBlock.blockNumber].steps[length].set({
        stepNumber: length + 1,
        stepText: "",
      });
    } else if (recipeInputType === "edited") {
      const length =
        state.editedRecipe.stepList[inputStepBlock.blockNumber].steps.length;
      state.editedRecipe.stepList[inputStepBlock.blockNumber].steps[length].set(
        {
          stepNumber: length + 1,
          stepText: "",
        }
      );
    }
  };

  const handleDeleteLastStep = () => {
    if (recipeInputType === "input") {
      const length =
        state.inputRecipe.stepList[inputStepBlock.blockNumber].steps.length;
      state.inputRecipe.stepList[inputStepBlock.blockNumber].steps[length].set(
        none
      );
    } else if (recipeInputType === "edited") {
      const length =
        state.editedRecipe.stepList[inputStepBlock.blockNumber].steps.length -
        1;
      state.editedRecipe.stepList[inputStepBlock.blockNumber].steps[length].set(
        none
      );
    }
  };

  const handleInputForChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.inputRecipe.stepList[inputStepBlock.blockNumber].for.set(
      e.target.value
    );
  };

  const handleEditedForChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    state.editedRecipe.stepList[inputStepBlock.blockNumber].for.set(
      e.target.value
    );
  };

  return (
    <div>
      {recipeInputType === "edited" ? (
        <input
          onChange={handleEditedForChange}
          value={state.editedRecipe.stepList[
            inputStepBlock.blockNumber
          ].for.get()}
        ></input>
      ) : (
        <input
          onChange={handleInputForChange}
          value={state.inputRecipe.stepList[
            inputStepBlock.blockNumber
          ].for.get()}
        ></input>
      )}
      <button onClick={handleAddStep}>Add Step</button>
      <button onClick={handleDeleteLastStep}>Delete Step</button>
      <ol>{listOfRecipeSteps}</ol>
    </div>
  );
};

export default InputStepBlock;
