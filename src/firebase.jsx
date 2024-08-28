// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjogqSSQa1_oImLvHwcT8Mm1xuZjTb4XQ",
  authDomain: "eazyliving-fc25a.firebaseapp.com",
  projectId: "eazyliving-fc25a",
  storageBucket: "eazyliving-fc25a.appspot.com",
  messagingSenderId: "1002241710857",
  appId: "1:1002241710857:web:6a3119455401a28fcf51d8",
  measurementId: "G-YYC5844GYH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);




export const auth = getAuth(app);


export const db = getFirestore(app);


export const storage = getStorage(app);