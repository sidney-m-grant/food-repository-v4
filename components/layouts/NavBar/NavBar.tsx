import React from "react";
import styles from "./NavBar.module.css";

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
    <div className={styles.navBar}>
      <button onClick={handleRecipeListClick}>To Recipe List</button>
      <button onClick={handleRecipeInputClick}>To Recipe Input</button>
      <button onClick={handleCalendarClick}>To Calendar</button>
      <button onClick={handleGroceryListClick}>To Grocery List</button>
      <button onClick={handleSocialClick}>To Social</button>
      <button onClick={handleSignInClick}>To Sign In</button>
      <button onClick={handleRecipeEditClick}>To Edit Recipe</button>
    </div>
  );
};

export default NavBar;
