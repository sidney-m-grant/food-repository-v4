import React from "react";
import InputSideBarFunctions from "./inputSideBarFunctions/InputSideBarFunctions";
import styled from "styled-components";

export const Input_SideBar = styled.div`
  height: 100%;
  width: 250px;
  position: fixed;
  left: 0;
  border: 1px;
  border-style: solid;
  top: 30px;
`;

interface Props {
  recipeInputType: "edited" | "input";
}

const InputSidebar: React.FC<Props> = ({ recipeInputType }) => {
  return (
    <Input_SideBar>
      <InputSideBarFunctions recipeInputType={recipeInputType} />
    </Input_SideBar>
  );
};

export default InputSidebar;
