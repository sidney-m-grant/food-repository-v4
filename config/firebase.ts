import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCpyzR8k8GZmCbLtfBzGZe2IEj029di1So",
  authDomain: "food-repository-v4.firebaseapp.com",
  projectId: "food-repository-v4",
  storageBucket: "food-repository-v4.appspot.com",
  messagingSenderId: "271812199862",
  appId: "1:271812199862:web:f2c35fcb16128f270cad17",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
