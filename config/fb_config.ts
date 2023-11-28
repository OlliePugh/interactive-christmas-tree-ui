// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { connectStorageEmulator, getStorage } from "@firebase/storage";
import { getAnalytics } from "@firebase/analytics";
import { production } from "@/config/config";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

declare global {
  interface Window {
    analyticsEnabled: boolean | undefined;
  }
}

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

const auth = getAuth(app);
const realtime = getDatabase(app);
const functions = getFunctions(app, "europe-west1");
const storage = getStorage(app);
const firestore = getFirestore(app);

if (!production) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectFunctionsEmulator(functions, "192.168.1.85", 5001);
  connectDatabaseEmulator(realtime, "localhost", 9000);
  connectStorageEmulator(storage, "localhost", 9199);
  connectFirestoreEmulator(firestore, "localhost", 8080);
}

let analytics;

const enableAnalytics = () => {
  analytics = getAnalytics(app);
};

if (typeof window !== "undefined") {
  if (window.analyticsEnabled) {
    enableAnalytics();
  }

  window.addEventListener("analyticsEnabled", enableAnalytics, false);
}

export { functions, auth, storage, firestore, analytics };
export default realtime;
