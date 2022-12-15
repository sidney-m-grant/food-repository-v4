import React from "react";
import { Recipe } from "../util/store";

interface Props {
  recipe: Recipe;
  setCurrentlyDragged?: React.Dispatch<React.SetStateAction<string>>;
}

const CalendarIndividualRecipe: React.FC<Props> = ({
  recipe,
  setCurrentlyDragged,
}) => {
  const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (!setCurrentlyDragged) {
      return;
    }
    console.log(recipe.recipeName);
    setCurrentlyDragged(recipe.recipeName);
  };

  return (
    <>
      <h5 draggable onDragStart={dragStart} style={{ display: "inline" }}>
        {recipe.recipeName}
      </h5>
    </>
  );
};

export default CalendarIndividualRecipe;
