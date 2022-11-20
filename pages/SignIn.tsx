import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

const SignIn = () => {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const { user, signUp, logIn, logOut } = useAuth();
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      await signUp(signUpEmail, signUpPassword);
      const socialCollection = {
        name: "social",
      };
      const recipeCollection = {
        name: "recipe",
      };
      const friendRequestArray = {
        friendRequests: [],
      };
      const friendListArray = {
        friendList: [],
      };
      const cookBookArray = {
        cookBooks: ["All Recipes"],
      };
      await setDoc(doc(db, signUpEmail, "social"), socialCollection);
      await setDoc(
        doc(db, signUpEmail, "social", "socialItems", "friendRequestArray"),
        friendRequestArray
      );
      await setDoc(
        doc(db, signUpEmail, "social", "socialItems", "friendListArray"),
        friendListArray
      );
      await setDoc(doc(db, signUpEmail, "recipeCollection"), recipeCollection);
      await setDoc(
        doc(db, signUpEmail, "recipeCollection", "miscItems", "cookBookArray"),
        cookBookArray
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignIn = async () => {
    try {
      await logIn(signInEmail, signInPassword);
      router.push("/RecipeList");
    } catch (err) {
      console.log(err);
    }
  };

  const handleAlreadySignedIn = () => {
    router.push("/RecipeList");
  };

  return (
    <div className="sign-in-container">
      <div>{user?.email ? user.email : "no one logged in"}</div>
      <div>
        <input
          onChange={(e) => {
            setSignInEmail(e.target.value);
          }}
          value={signInEmail}
          placeholder="Sign In Email"
        />

        <input
          onChange={(e) => {
            setSignInPassword(e.target.value);
          }}
          value={signInPassword}
          placeholder="Sign In Password"
        />

        <button onClick={handleSignIn}>Sign In</button>
      </div>
      <div>
        <input
          onChange={(e) => {
            setSignUpEmail(e.target.value);
          }}
          value={signUpEmail}
          placeholder="Sign Up Email"
        />

        <input
          onChange={(e) => {
            setSignUpPassword(e.target.value);
          }}
          value={signUpPassword}
          placeholder="Sign Up Password"
        />
        <button onClick={handleSignUp}>Sign Up</button>
      </div>

      <div>
        <button onClick={logOut}>Log Out</button>
        <button onClick={handleAlreadySignedIn}>Already Signed In</button>
      </div>
    </div>
  );
};

export default SignIn;
