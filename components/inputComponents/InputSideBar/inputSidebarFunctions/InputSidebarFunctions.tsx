import React, { useState } from "react";
import { store } from "../../../util/store";
import { useState as useStateHookState, none } from "@hookstate/core";
import clone from "just-clone";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";
import { useAuth } from "../../../../context/AuthContext";
import { db, storage } from "../../../../config/firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { v4 } from "uuid";
import Compressor from "compressorjs";

interface Props {
  recipeInputType: "edited" | "input";
}

const InputSidebarFunctions: React.FC<Props> = ({ recipeInputType }) => {
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

  const checkIfNameAlreadyExists = (name: string) => {
    for (let i = 0; i < state.allRecipes.get().length; i++) {
      if (name === state.allRecipes[i].recipeName.get()) {
        return false;
      }
    }
    return true;
  };

  const uploadRecipe = async () => {
    if (recipeInputType === "input") {
      if (
        state.inputRecipe.recipeName.get() &&
        state.inputRecipe.stepList.get().length > 0 &&
        state.inputRecipe.ingredientList.get().length > 0 &&
        state.inputRecipe.recipeName.get() !== "cookBooks" &&
        checkIfNameAlreadyExists(state.inputRecipe.recipeName.get())
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
    } else if (recipeInputType === "edited") {
      if (
        state.editedRecipe.stepList.get().length > 0 &&
        state.editedRecipe.ingredientList.get().length > 0
      ) {
        if (confirm("Upload Recipe?")) {
          if (tempImageFile) {
            const imgToDelete = state.editedRecipe.imgPath.get();
            let tempObject = clone(state.editedRecipe.get());
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
                    setDoc(
                      doc(
                        db,
                        `${user?.email}`,
                        "recipeCollection",
                        "recipes",
                        `${tempObject.docId}`
                      ),
                      tempObject
                    )
                  );
              },
            });
            if (imgToDelete) {
              deleteImage(imgToDelete);
            }
          } else {
            await setDoc(
              doc(
                db,
                `${user?.email}`,
                "recipeCollection",
                "recipes",
                `${state.editedRecipe.docId.get()}`
              ),
              state.editedRecipe.get()
            );
          }
        }
      }
    }
  };

  const deleteImage = async (imgPath: string | undefined) => {
    const deleteRef = ref(storage, imgPath);
    await deleteObject(deleteRef);
  };

  return (
    <div>
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

export default InputSidebarFunctions;
