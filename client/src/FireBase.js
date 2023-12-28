// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "realstate-62a90.firebaseapp.com",
    projectId: "realstate-62a90",
    storageBucket: "realstate-62a90.appspot.com",
    messagingSenderId: "862114521273",
    appId: "1:862114521273:web:117b34529e8d28b3c5fb68"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);






