import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Import the Firebase modules

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyC6uo16dHxmTqZH5UsQr7kSnZJl9BFqPcc",
    authDomain: "esp32-953d9.firebaseapp.com",
    projectId: "esp32-953d9",
    storageBucket: "esp32-953d9.firebasestorage.app",
    messagingSenderId: "71726507761",
    appId: "1:71726507761:web:58dc8cd5edf74da8712b50",
    measurementId: "G-QXY3YM43B8"
};

let db = null;

function dbConnect() {
  if (!getApps().length) {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("Connected to Firebase");
  }
  return db;
}

export default dbConnect;