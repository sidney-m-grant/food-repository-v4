import React, { useEffect, useState } from "react";
import { useState as useStateHookState } from "@hookstate/core";
import { store } from "../components/util/store";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import clone from "just-clone";

const Social = () => {
  const [friendRequestInput, setFriendRequestInput] = useState("");
  const state = useStateHookState(store);
  const { user } = useAuth();

  useEffect(() => {
    const getFriendList = async () => {
      const snapshot = await getDoc(
        doc(db, user.email, "social", "socialItems", "friendListArray")
      );
      const friends = snapshot.data().friendListArray;
      state.listOfFriends.set(friends);
    };
    getFriendList();
    const getFriendRequestList = async () => {
      const snapshot = await getDoc(
        doc(db, user.email, "social", "socialItems", "friendRequestArray")
      );
      const friendRequests = snapshot.data().friendRequestArray;
      state.friendRequestList.set(friendRequests);
    };
    getFriendRequestList();
  }, [user.email]);

  const sendFriendRequest = async () => {
    const snapshot = await getDoc(
      doc(db, friendRequestInput, "social", "socialItems", "friendRequestArray")
    );
    const friendsFriendRequests = snapshot.data().friendRequestArray;
    if (friendsFriendRequests.includes(user.email)) {
      return;
    }
    friendsFriendRequests.push(user.email);
    const tempObject = {
      friendRequests: friendsFriendRequests,
    };
    await setDoc(
      doc(
        db,
        friendRequestInput,
        "social",
        "socialItems",
        "friendRequestArray"
      ),
      tempObject
    );
  };

  const friendListMap = state.listOfFriends.get().map((friend) => {
    return <li key={state.listOfFriends.indexOf(friend)}>{friend}</li>;
  });

  const friendRequestMap = state.friendRequestList.get().map((request) => {
    return <li key={state.friendRequestList.indexOf(request)}>{request}</li>;
  });

  return (
    <div style={{ marginTop: 50 }}>
      <input
        onChange={(e) => setFriendRequestInput(e.target.value)}
        value={friendRequestInput}
      ></input>
      <button onClick={sendFriendRequest}>Send Friend Request</button>
      {friendListMap}
      {friendRequestMap}
    </div>
  );
};

export default Social;
