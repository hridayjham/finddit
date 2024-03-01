// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5sUNngPmqBGtRaYu2B9RZU6yshKW4StA",
  authDomain: "finddit-18aa3.firebaseapp.com",
  projectId: "finddit-18aa3",
  storageBucket: "finddit-18aa3.appspot.com",
  messagingSenderId: "1086803235540",
  appId: "1:1086803235540:web:0b033a852363904e6b6141"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
