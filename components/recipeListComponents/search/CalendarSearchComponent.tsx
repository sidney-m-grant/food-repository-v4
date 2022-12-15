import React, { useState } from "react";
import Fuse from "fuse.js";
import type { Recipe } from "../../util/store";
import CalendarRecipeList from "../../calendarComponents/CalendarRecipeList";

interface Props {
  allRecipes: Recipe[];
  setCurrentlyDragged: React.Dispatch<React.SetStateAction<string>>;
}

const CalendarSearchComponent: React.FC<Props> = ({
  allRecipes,
  setCurrentlyDragged,
}) => {
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
      <CalendarRecipeList
        recipes={recipeResults}
        setCurrentlyDragged={setCurrentlyDragged}
      />
    </div>
  );
};

export default CalendarSearchComponent;
