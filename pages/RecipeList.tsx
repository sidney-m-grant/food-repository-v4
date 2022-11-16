import React from "react";
import HeaderInputComponent from "../components/inputComponents/headerInputComponent/HeaderInputComponent";
import MainInputComponent from "../components/inputComponents/mainInputComponent/MainInputComponent";
import SideBar from "../components/inputComponents/InputSideBar/InputSideBar";
import CurrentRecipeContainer from "../components/currentRecipe/currentRecipeContainer/CurrentRecipeContainer";

const RecipeList = () => {
  return (
    /*
    <div className="recipe-container">
      <SideBar recipeInputType="edited" />
      <HeaderInputComponent recipeInputType="edited" />
      <MainInputComponent recipeInputType="edited" />
    </div>*/
    <CurrentRecipeContainer />
  );
};

export default RecipeList;
