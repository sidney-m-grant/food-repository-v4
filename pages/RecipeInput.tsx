import React from "react";
import HeaderInputComponent from "../components/inputComponents/headerInputComponent/HeaderInputComponent";
import InputSidebar from "../components/inputComponents/inputSidebar/InputSidebar";
import MainInputComponent from "../components/inputComponents/mainInputComponent/MainInputComponent";

const RecipeInput = () => {
  return (
    <div className="recipe-container">
      <InputSidebar recipeInputType="input" />
      <HeaderInputComponent recipeInputType="input" />
      <MainInputComponent recipeInputType="input" />
    </div>
  );
};

export default RecipeInput;
