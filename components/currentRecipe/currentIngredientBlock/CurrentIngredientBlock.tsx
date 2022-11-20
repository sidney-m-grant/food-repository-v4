import React from "react";
import { IngredientBlock } from "../../util/store";

interface Props {
  ingredientBlock: IngredientBlock;
}

const CurrentIngredientBlock: React.FC<Props> = ({ ingredientBlock }) => {
  const listIngredients = ingredientBlock.ingredients.map((ingredient) => {
    return (
      <li key={ingredient.id}>
        <h5>
          {ingredient.amount} {ingredient.unit} {ingredient.name}
        </h5>
      </li>
    );
  });

  return (
    <ol>
      <h5>{ingredientBlock.for}</h5>
      {listIngredients}
    </ol>
  );
};

export default CurrentIngredientBlock;
