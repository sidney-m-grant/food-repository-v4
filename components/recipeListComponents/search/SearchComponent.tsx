import React, { useState } from "react";
import Fuse from "fuse.js";
import { Recipe } from "../../util/store";
import RecipeListComponent from "../recipeListComponent/RecipeListComponent";
import { DisplayType } from "../../../pages/RecipeList";

interface Props {
  allRecipes: Recipe[];
  setDisplayType: React.Dispatch<React.SetStateAction<DisplayType>>;
}

const SearchComponent: React.FC<Props> = ({ allRecipes, setDisplayType }) => {
  const [searchInput, setSearchInput] = useState("");

  const fuse = new Fuse(allRecipes, { keys: ["recipeName"] });
  const results = fuse.search(searchInput);
  const recipeResults = searchInput
    ? results.map((result) => result.item)
    : allRecipes;

  return (
    <div>
      <input
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
      ></input>
      <RecipeListComponent
        recipes={recipeResults}
        setDisplayType={setDisplayType}
      />
    </div>
  );
};

export default SearchComponent;
