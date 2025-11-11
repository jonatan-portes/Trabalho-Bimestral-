// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDejt8q2yCM7Mvj_656nHSp1eoMdIuiC_0",
  authDomain: "trabalho-2bimestre.firebaseapp.com",
  databaseURL: "https://trabalho-2bimestre-default-rtdb.firebaseio.com",
  projectId: "trabalho-2bimestre",
  storageBucket: "trabalho-2bimestre.firebasestorage.app",
  messagingSenderId: "597930186313",
  appId: "1:597930186313:web:f892d63cbb7500a426d198",
  measurementId: "G-J849MQ3NKV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const auth = getAuth(app);