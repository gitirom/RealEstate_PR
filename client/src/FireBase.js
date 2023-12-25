// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-realestate-cbb11.firebaseapp.com",
    projectId: "mern-realestate-cbb11",
    storageBucket: "mern-realestate-cbb11.appspot.com",
    messagingSenderId: "804525333014",
    appId: "1:804525333014:web:d94c9459c58184115f3337"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);




