// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBH19HM59oCsuSctz45G80Kb1dtnN8YQA",
  authDomain: "book-3d7c1.firebaseapp.com",
  projectId: "book-3d7c1",
  storageBucket: "book-3d7c1.appspot.com",
  messagingSenderId: "641037176066",
  appId: "1:641037176066:web:2fb7bc1c4d2b29b9c2061b",
  measurementId: "G-PXLMWY5007"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth }; 