// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDC5az-5AB04MKR5s0ry2h8aGw0N2li8VU",
  authDomain: "netflixgpt-eccb4.firebaseapp.com",
  projectId: "netflixgpt-eccb4",
  storageBucket: "netflixgpt-eccb4.appspot.com",
  messagingSenderId: "90685261295",
  appId: "1:90685261295:web:e4a306cb8222a7d53ea21a",
  measurementId: "G-01PQPCVGZ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();