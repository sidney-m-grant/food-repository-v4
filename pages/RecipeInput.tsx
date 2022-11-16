import React from "react";
import HeaderInputComponent from "../components/inputComponents/headerInputComponent/HeaderInputComponent";
import InputSideBar from "../components/inputComponents/InputSideBar/InputSideBar";
import MainInputComponent from "../components/inputComponents/mainInputComponent/MainInputComponent";

const RecipeInput = () => {
  return (
    <div className="recipe-container">
      <InputSideBar recipeInputType="input" />
      <HeaderInputComponent recipeInputType="input" />
      <MainInputComponent recipeInputType="input" />
    </div>
  );
};

export default RecipeInput;
