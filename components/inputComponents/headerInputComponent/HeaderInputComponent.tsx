import React from "react";
import { store } from "../../util/store";
import { useState as useStateHookState } from "@hookstate/core";
import styles from "./HeaderInputComponent.module.css";

interface Props {
  recipeInputType: "edited" | "input";
}

const HeaderInputComponent: React.FC<Props> = ({ recipeInputType }) => {
  const state = useStateHookState(store);

  const handleEditedPrepTimeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    state.editedRecipe.prepTime.set(e.target.value);
  };
  const handleEditedServesAmountChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    state.editedRecipe.servesAmount.set(e.target.value);
  };
  const handleEditedActiveCookingTimeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    state.editedRecipe.activeCookingTime.set(e.target.value);
  };
  const handleEditedTotalTimeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    state.editedRecipe.totalTime.set(e.target.value);
  };
  const handleEditedSourceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    state.editedRecipe.source.set(e.target.value);
  };
  const handleEditedBriefDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    state.editedRecipe.briefDescription.set(e.target.value);
  };
  const handleEditedNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    state.editedRecipe.recipeName.set(e.target.value);
  };

  const handleInputNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    state.inputRecipe.recipeName.set(e.target.value);
  };
  const handleInputPrepTimeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    state.inputRecipe.prepTime.set(e.target.value);
  };
  const handleInputServesAmountChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    state.inputRecipe.servesAmount.set(e.target.value);
  };
  const handleInputActiveCookingTimeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    state.inputRecipe.activeCookingTime.set(e.target.value);
  };
  const handleInputTotalTimeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    state.inputRecipe.totalTime.set(e.target.value);
  };
  const handleInputSourceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    state.inputRecipe.source.set(e.target.value);
  };
  const handleInputBriefDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    state.inputRecipe.briefDescription.set(e.target.value);
  };

  return (
    <div className={styles.HeaderInputComponent}>
      {recipeInputType === "edited" ? (
        <input
          onChange={handleEditedPrepTimeChange}
          value={state.editedRecipe.prepTime.get()}
        ></input>
      ) : (
        <input
          onChange={handleInputPrepTimeChange}
          value={state.inputRecipe.prepTime.get()}
        ></input>
      )}
      {recipeInputType === "edited" ? (
        <input
          onChange={handleEditedActiveCookingTimeChange}
          value={state.editedRecipe.activeCookingTime.get()}
        ></input>
      ) : (
        <input
          onChange={handleInputActiveCookingTimeChange}
          value={state.inputRecipe.activeCookingTime.get()}
        ></input>
      )}
      {recipeInputType === "edited" ? (
        <input
          onChange={handleEditedServesAmountChange}
          value={state.editedRecipe.servesAmount.get()}
        ></input>
      ) : (
        <input
          onChange={handleInputServesAmountChange}
          value={state.inputRecipe.servesAmount.get()}
        ></input>
      )}
      {recipeInputType === "edited" ? (
        <input
          onChange={handleEditedTotalTimeChange}
          value={state.editedRecipe.totalTime.get()}
        ></input>
      ) : (
        <input
          onChange={handleInputTotalTimeChange}
          value={state.inputRecipe.totalTime.get()}
        ></input>
      )}
      {recipeInputType === "edited" ? (
        <input
          onChange={handleEditedSourceChange}
          value={state.editedRecipe.source.get()}
        ></input>
      ) : (
        <input
          onChange={handleInputSourceChange}
          value={state.inputRecipe.source.get()}
        ></input>
      )}
      {recipeInputType === "edited" ? (
        <input
          onChange={handleEditedBriefDescriptionChange}
          value={state.editedRecipe.briefDescription.get()}
        ></input>
      ) : (
        <input
          onChange={handleInputBriefDescriptionChange}
          value={state.inputRecipe.briefDescription.get()}
        ></input>
      )}
      {recipeInputType === "edited" ? (
        <input
          onChange={handleEditedNameChange}
          value={state.editedRecipe.recipeName.get()}
        ></input>
      ) : (
        <input
          onChange={handleInputNameChange}
          value={state.inputRecipe.recipeName.get()}
        ></input>
      )}
    </div>
  );
};

export default HeaderInputComponent;
