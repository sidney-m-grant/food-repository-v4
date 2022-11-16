import React, { useState } from "react";
import { store } from "../../util/store";
import { useState as useStateHookState, none } from "@hookstate/core";
import styles from "./InputSideBar.module.css";
import clone from "just-clone";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "../../../context/AuthContext";
import { db, storage } from "../../../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import Compressor from "compressorjs";

interface Props {
  recipeInputType: "edited" | "input";
}

const InputSideBar: React.FC<Props> = ({ recipeInputType }) => {
  const state = useStateHookState(store);
  const { user } = useAuth();

  const [tempImageFile, setTempImageFile] = useState<File | null>(null);

  const addNewStepBlock = () => {
    if (recipeInputType === "edited") {
      const length = state.editedRecipe.stepList.length;
      state.editedRecipe.stepList[length].set({
        for: "",
        blockNumber: length,
        steps: [
          {
            stepNumber: 1,
            stepText: "",
          },
        ],
      });
    } else if (recipeInputType === "input") {
      const length = state.inputRecipe.stepList.length;
      state.inputRecipe.stepList[length].set({
        for: "",
        blockNumber: length,
        steps: [
          {
            stepNumber: 1,
            stepText: "",
          },
        ],
      });
    }
  };
  const addNewIngredientBlock = () => {
    if (recipeInputType === "edited") {
      const length = state.editedRecipe.ingredientList.length;
      state.editedRecipe.ingredientList[length].set({
        for: "",
        blockNumber: length,
        ingredients: [
          {
            id: 1,
            amount: "",
            name: "",
            unit: "",
          },
        ],
      });
    } else if (recipeInputType === "input") {
      const length = state.inputRecipe.ingredientList.length;
      state.inputRecipe.ingredientList[length].set({
        for: "",
        blockNumber: length,
        ingredients: [
          {
            id: 1,
            amount: "",
            name: "",
            unit: "",
          },
        ],
      });
    }
  };
  const deleteLastStepBlock = () => {
    if (recipeInputType === "edited") {
      const length = state.editedRecipe.stepList.length;
      state.editedRecipe.stepList[length - 1].set(none);
    } else if (recipeInputType === "input") {
      const length = state.inputRecipe.stepList.length;
      state.editedRecipe.stepList[length - 1].set(none);
    }
  };
  const deleteLastIngredientBlock = () => {
    if (recipeInputType === "edited") {
      const length = state.editedRecipe.ingredientList.length;
      state.editedRecipe.ingredientList[length - 1].set(none);
    } else if (recipeInputType === "input") {
      const length = state.inputRecipe.ingredientList.length;
      state.editedRecipe.ingredientList[length - 1].set(none);
    }
  };

  const handleImgPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (recipeInputType === "edited") {
      if (!e.target.files) {
        setTempImageFile(null);
        state.editedImagePreview.set("");
        return;
      }
      setTempImageFile(e.target.files[0]);
      state.editedImagePreview.set(URL.createObjectURL(e.target.files[0]));
    } else if (recipeInputType === "input") {
      if (!e.target.files) {
        setTempImageFile(null);
        state.inputImagePreview.set("");
        return;
      }
      setTempImageFile(e.target.files[0]);
      state.inputImagePreview.set(URL.createObjectURL(e.target.files[0]));
    }
  };

  const uploadRecipe = async () => {
    console.log(state.inputRecipe.get());
    if (
      state.inputRecipe.recipeName.get() &&
      state.inputRecipe.stepList.get().length > 0 &&
      state.inputRecipe.ingredientList.get().length > 0
    ) {
      if (confirm("Upload Recipe?")) {
        if (tempImageFile) {
          let tempObject = clone(state.inputRecipe.get());
          const imageRef = ref(
            storage,
            `${user?.email}/${tempImageFile.name + v4()}`
          );
          new Compressor(tempImageFile, {
            quality: 0.2,
            success(result) {
              uploadBytes(imageRef, result)
                .then((snapshot) => getDownloadURL(snapshot.ref))
                .then((url) => (tempObject.imgPath = url))
                .then(() =>
                  addDoc(
                    collection(
                      db,
                      `${user?.email}`,
                      "recipeCollection",
                      "recipes"
                    ),
                    tempObject
                  )
                );
            },
          });
        } else {
          await addDoc(
            collection(db, `${user?.email}`, "recipeCollection", "recipes"),
            state.inputRecipe.get()
          );
        }
      }
    }
  };

  return (
    <div className={styles.InputSideBar}>
      <button onClick={addNewStepBlock}>Add New Step Block</button>

      <button onClick={addNewIngredientBlock}>Add New Ingredient Block</button>

      <button onClick={deleteLastStepBlock}>Delete Last Step Block</button>

      <button onClick={deleteLastIngredientBlock}>
        Delete Last Ingredient Block
      </button>

      <button onClick={uploadRecipe}>Upload Recipe</button>

      <input type="file" onChange={handleImgPreview}></input>
    </div>
  );
};

export default InputSideBar;
