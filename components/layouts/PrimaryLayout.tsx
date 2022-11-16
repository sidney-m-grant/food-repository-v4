import React from "react";
import NavBar from "./NavBar/NavBar";

interface Props {
  children: React.ReactNode;
}

const PrimaryLayout = ({ children }: Props) => {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
};

export default PrimaryLayout;
