// Import firebase modules 
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgP-BpWGnw_GhzXtcq-mY1mRKa0KKznjc",
  authDomain: "linkedin-clone-7fde9.firebaseapp.com",
  projectId: "linkedin-clone-7fde9",
  storageBucket: "linkedin-clone-7fde9.appspot.com",
  messagingSenderId: "156656828940",
  appId: "1:156656828940:web:0d3336a3fedbe3a499e429",
  measurementId: "G-D1QSL3BRSD"
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Get Firestore database
const db = getFirestore();

// Get Auth service
const auth = getAuth();

export { db, auth };