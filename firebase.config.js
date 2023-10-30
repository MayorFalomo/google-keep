// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlaz2i4T1ClQ-fgPCktEg5zui3VYZcRdU",
  authDomain: "hi-notepad.firebaseapp.com",
  projectId: "hi-notepad",
  storageBucket: "hi-notepad.appspot.com",
  messagingSenderId: "321564833735",
  appId: "1:321564833735:web:756a019bd36271d5bf4be2",
  measurementId: "G-ED6Y6KSY7J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
