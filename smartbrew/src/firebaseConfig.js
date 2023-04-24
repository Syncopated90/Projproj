import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
export const firebaseConfig = {
  apiKey: "AIzaSyD6svOYrsv18vruhGY-YGk5iQcHEQoU0Rs",
  authDomain: "smartbrew-1337.firebaseapp.com",
  databaseURL: "https://smartbrew-1337-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "smartbrew-1337",
  storageBucket: "smartbrew-1337.appspot.com",
  messagingSenderId: "986749143369",
  appId: "1:986749143369:web:38824fa2f58836dce5f298",
  measurementId: "G-ZMFQ45YRSH"
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);