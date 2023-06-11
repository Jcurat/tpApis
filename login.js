// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXCI0yR1Us1IR20zHjbPIqWaFii31kzf8",
  authDomain: "cocktailmania-58ecf.firebaseapp.com",
  projectId: "cocktailmania-58ecf",
  storageBucket: "cocktailmania-58ecf.appspot.com",
  messagingSenderId: "470186311041",
  appId: "1:470186311041:web:faebafd21f36077c657c80",
  measurementId: "G-570VXPQZRC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);