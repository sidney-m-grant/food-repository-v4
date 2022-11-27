import React, { useState, useEffect } from "react";
import { store } from "../../util/store";
import { useState as useStateHookState } from "@hookstate/core";
import { useAuth } from "../../../context/AuthContext";
import { db } from "../../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import styled from "styled-components";

interface Props {
  recipeInputType: "edited" | "input";
}

export const Header_Input_Container = styled.div`
  border: 1px;
  border-style: solid;
  width: auto;
  display: block;
`;

const HeaderInputComponent: React.FC<Props> = ({ recipeInputType }) => {
  const { user } = useAuth();
  const state = useStateHookState(store);
  const [selectedCookBook, setSelectedCookBook] = useState("");
  const [cookBookList, setCookBookList] = useState<string[]>([]);

  useEffect(() => {
    const getCookBooks = async () => {
      const snapshot = await getDoc(
        doc(db, user.email, "recipeCollection", "miscItems", "cookBookArray")
      );
      const cookBooks = snapshot.data()?.cookBooks;
      state.cookBookList.set(cookBooks);
      setCookBookList(cookBooks);
    };
    getCookBooks();
  }, [user.email]);

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

  const listOfCookBooks = cookBookList.filter(
    (cookBook) => cookBook != "All Recipes"
  );

  const filteredListOfCookBooks = listOfCookBooks.map((entry) => {
    return (
      <option key={entry} value={entry}>
        {entry}
      </option>
    );
  });

  const handleEditedCookBookSelect = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    state.editedRecipe.cookBook.set(e.target.value);
  };

  const handleInputCookBookSelect = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    state.inputRecipe.cookBook.set(e.target.value);
  };

  return (
    <Header_Input_Container>
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
      {recipeInputType === "input" ? (
        <input
          onChange={handleInputNameChange}
          value={state.inputRecipe.recipeName.get()}
        ></input>
      ) : null}

      {recipeInputType === "edited" && cookBookList ? (
        <select
          onChange={handleEditedCookBookSelect}
          value={state.editedRecipe.cookBook.get()}
        >
          <option value={""}></option>
          {filteredListOfCookBooks}
        </select>
      ) : null}

      {recipeInputType === "input" && cookBookList ? (
        <select
          onChange={handleInputCookBookSelect}
          value={state.inputRecipe.cookBook.get()}
        >
          <option value={""}></option>
          {filteredListOfCookBooks}
        </select>
      ) : null}
    </Header_Input_Container>
  );
};

export default HeaderInputComponent;
