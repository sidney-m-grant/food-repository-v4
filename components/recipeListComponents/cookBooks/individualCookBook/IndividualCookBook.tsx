import React from "react";
import { OpenSubMenu } from "../../recipeListSidebar/RecipeListSidebar";

interface Props {
  setSelectedCookBook: React.Dispatch<React.SetStateAction<string>>;
  cookBook: string;
  setOpenSubMenu: React.Dispatch<React.SetStateAction<OpenSubMenu>>;
}

const IndividualCookBook: React.FC<Props> = ({
  setSelectedCookBook,
  cookBook,
  setOpenSubMenu,
}) => {
  const handleClick = () => {
    setSelectedCookBook(cookBook);
    setOpenSubMenu("");
  };
  return <li onClick={handleClick}>{cookBook}</li>;
};

export default IndividualCookBook;
