import React from "react";
import styles from "./InputSidebar.module.css";
import InputSidebarFunctions from "./inputSidebarFunctions/InputSidebarFunctions";

interface Props {
  recipeInputType: "edited" | "input";
}

const InputSidebar: React.FC<Props> = ({ recipeInputType }) => {
  return (
    <div className={styles.InputSidebar}>
      <InputSidebarFunctions recipeInputType={recipeInputType} />
    </div>
  );
};

export default InputSidebar;
