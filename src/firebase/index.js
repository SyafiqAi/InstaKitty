// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC52a-9sjbxm0-XlEv5S_nTz4iMzE0w7B4",
  authDomain: "insta-kitty.firebaseapp.com",
  projectId: "insta-kitty",
  storageBucket: "insta-kitty.appspot.com",
  messagingSenderId: "744307421922",
  appId: "1:744307421922:web:6d91eb7e312da16c2564bb",
  measurementId: "G-K3346XPPH0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)