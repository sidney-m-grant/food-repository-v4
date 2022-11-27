import React from "react";
import styled from "styled-components";

export const Nav_Bar = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  display: block;
  height: 30px;
  border: 1px;
  border-style: solid;
`;

import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();

  const handleRecipeListClick = () => {
    router.push("/RecipeList");
  };

  const handleRecipeInputClick = () => {
    router.push("/RecipeInput");
  };

  const handleSignInClick = () => {
    router.push("/SignIn");
  };

  const handleRecipeEditClick = () => {
    router.push("/RecipeEdit");
  };

  const handleSocialClick = () => {
    router.push("/Social");
  };

  const handleCalendarClick = () => {
    router.push("/Calendar");
  };

  const handleGroceryListClick = () => {
    router.push("/GroceryList");
  };

  return (
    <Nav_Bar>
      <button onClick={handleRecipeListClick}>To Recipe List</button>
      <button onClick={handleRecipeInputClick}>To Recipe Input</button>
      <button onClick={handleCalendarClick}>To Calendar</button>
      <button onClick={handleGroceryListClick}>To Grocery List</button>
      <button onClick={handleSocialClick}>To Social</button>
      <button onClick={handleSignInClick}>To Sign In</button>
      <button onClick={handleRecipeEditClick}>To Edit Recipe</button>
    </Nav_Bar>
  );
};

export default NavBar;
