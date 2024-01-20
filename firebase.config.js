// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyDlaz2i4T1ClQ-fgPCktEg5zui3VYZcRdU",
  apiKey: process.env.API_KEY,
  authDomain: "hi-notepad.firebaseapp.com",
  projectId: "hi-notepad",
  storageBucket: "hi-notepad.appspot.com",
  messagingSenderId: "321564833735",
  appId: process.env.APP_ID,
  measurementId: "G-ED6Y6KSY7J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const storage = getStorage(app);

export const db = getFirestore(app);
