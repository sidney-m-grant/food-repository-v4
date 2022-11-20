import { getDoc, doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../config/firebase";
import { useAuth } from "../../../context/AuthContext";
import clone from "just-clone";
import { useState as useStateHookState } from "@hookstate/core";
import { store } from "../../util/store";

const CookBooks = () => {
  const { user } = useAuth();
  const state = useStateHookState(store);
  const [cookBookList, setCookBookList] = useState<string[]>([]);
  const [newCookBookInput, setNewCookBookInput] = useState("");
  const [toggleFetchCookBooks, setToggleFetchCookBooks] = useState(false);

  useEffect(() => {
    const getCookBooks = async () => {
      const snapshot = await getDoc(
        doc(db, user.email, "recipeCollection", "miscItems", "cookBookArray")
      );
      const cookBooks = snapshot.data()?.cookBooks;
      console.log(cookBooks);
      state.cookBookList.set(cookBooks);
      setCookBookList(cookBooks);
    };
    getCookBooks();
  }, [user.email, toggleFetchCookBooks]);

  const addNewCookBook = async () => {
    const temp = clone(cookBookList);
    temp.push(newCookBookInput);
    const tempObject = {
      cookBooks: temp,
    };
    await setDoc(
      doc(db, user.email, "recipeCollection", "miscItems", "cookBookArray"),
      tempObject
    );
    setToggleFetchCookBooks(!toggleFetchCookBooks);
  };

  const listOfCookBooks = cookBookList.map((cookBook) => {
    return <li key={cookBookList.indexOf(cookBook)}>{cookBook}</li>;
  });

  return (
    <div>
      <input
        onChange={(e) => {
          setNewCookBookInput(e.target.value);
        }}
        value={newCookBookInput}
      ></input>
      <button onClick={addNewCookBook}>Add New Cook Book</button>
      {cookBookList ? <ul>{listOfCookBooks}</ul> : null}
    </div>
  );
};

export default CookBooks;
