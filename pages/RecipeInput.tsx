import React from "react";
import HeaderInputComponent from "../components/inputComponents/headerInputComponent/HeaderInputComponent";
import InputSideBar from "../components/inputComponents/inputSideBar/InputSideBar";
import MainInputComponent from "../components/inputComponents/mainInputComponent/MainInputComponent";
import styled from "styled-components";

export const Recipe_Container = styled.div`
  margin-left: 250px;
  margin-top: 30px;
`;

const RecipeInput = () => {
  return (
    <Recipe_Container>
      <InputSideBar recipeInputType="input" />
      <HeaderInputComponent recipeInputType="input" />
      <MainInputComponent recipeInputType="input" />
    </Recipe_Container>
  );
};

export default RecipeInput;
