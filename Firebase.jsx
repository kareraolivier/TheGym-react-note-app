// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBEXjwGIcFVsmoOK84x82iXP6n2D8s3bk8",
  authDomain: "noteapp-e00d9.firebaseapp.com",
  projectId: "noteapp-e00d9",
  storageBucket: "noteapp-e00d9.appspot.com",
  messagingSenderId: "877597971785",
  appId: "1:877597971785:web:5d61c3705d9c26ffb8f698",
  measurementId: "G-YKNY87YE7J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const notesCollection = collection(db, "notes");
