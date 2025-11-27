// Frontend/src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNpXkqrlEdCqop3k5NYu03CgXFivdsL7g",
  authDomain: "marketconnect-5206a.firebaseapp.com",
  projectId: "marketconnect-5206a",
  storageBucket: "marketconnect-5206a.firebasestorage.app",
  messagingSenderId: "111758273350",
  appId: "1:111758273350:web:0486e163deacf7c5b3d347"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth(app);
