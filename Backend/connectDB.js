// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import {getDatabase, ref} from "firebase/database"
import dotenv from "dotenv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
dotenv.config();
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.GOOGLE_API_KEY,
    authDomain: "carbon-storm-471412-e6.firebaseapp.com",
    databaseURL: "https://carbon-storm-471412-e6-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "carbon-storm-471412-e6",
    storageBucket: "carbon-storm-471412-e6.firebasestorage.app",
    messagingSenderId: "295137550486",
    appId: "1:295137550486:web:e7312c45ffe888a92922b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
console.log("Connected to DB");
export default db;