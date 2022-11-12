// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTDoOZ-PyoNdtlCdtc1nNBfF59gYS5a1k",
  authDomain: "online-christmas-tree.firebaseapp.com",
  projectId: "online-christmas-tree",
  storageBucket: "online-christmas-tree.appspot.com",
  messagingSenderId: "303709889135",
  appId: "1:303709889135:web:8ec8daed2b3f76a388639a",
  databaseURL:
    "https://online-christmas-tree-default-rtdb.europe-west1.firebasedatabase.app",
  measurementId: "G-NTKZ1RCW8N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const realtime = getDatabase(app);
export const functions = getFunctions(app, "europe-west1");
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default realtime;
