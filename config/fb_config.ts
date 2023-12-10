// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { production } from "@/config/config";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWyB6w2RTwxogH9DM92fY8Ufgu2lun990",
  authDomain: "real-world-games.firebaseapp.com",
  databaseURL:
    "https://interactive-christmas-tree.europe-west1.firebasedatabase.app/",
  projectId: "real-world-games",
  storageBucket: "real-world-games.appspot.com",
  messagingSenderId: "844489141235",
  appId: "1:844489141235:web:f009c88a6e25d65ff80086",
  measurementId: "G-D6ZVPMH107",
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
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
  connectDatabaseEmulator(realtime, "localhost", 9000);
  connectStorageEmulator(storage, "localhost", 9199);
  connectFirestoreEmulator(firestore, "localhost", 8080);
}

export { functions, auth, storage, firestore };
export default realtime;
