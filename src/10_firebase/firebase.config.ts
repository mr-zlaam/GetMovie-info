import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3pnGIm-UgOvtJrzTJnD2s9OBqaRzSfws",
  authDomain: "movie-app-backend-d2de5.firebaseapp.com",
  projectId: "movie-app-backend-d2de5",
  storageBucket: "movie-app-backend-d2de5.appspot.com",
  messagingSenderId: "644984086993",
  appId: "1:644984086993:web:901d9ff3e4a45ad41640f0",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export const Fbprovider = new FacebookAuthProvider();
export const GoogleProvider = new GoogleAuthProvider();
