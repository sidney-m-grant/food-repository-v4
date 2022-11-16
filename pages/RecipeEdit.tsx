import React from "react";
import InputSideBar from "../components/inputComponents/InputSideBar/InputSideBar";
import HeaderInputComponent from "../components/inputComponents/headerInputComponent/HeaderInputComponent";
import MainInputComponent from "../components/inputComponents/mainInputComponent/MainInputComponent";

const RecipeEdit = () => {
  return (
    <div className="recipe-container">
      <InputSideBar recipeInputType="edited" />
      <HeaderInputComponent recipeInputType="edited" />
      <MainInputComponent recipeInputType="edited" />
    </div>
  );
};

export default RecipeEdit;
