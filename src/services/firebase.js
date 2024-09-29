// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH99gdDR4OB8Sl5dbuasOeeYmuZKJiLXQ",
  authDomain: "dv-cwm-01.firebaseapp.com",
  projectId: "dv-cwm-01",
  storageBucket: "dv-cwm-01.appspot.com",
  messagingSenderId: "969386663362",
  appId: "1:969386663362:web:93c0869c13f474a65b8a5b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);