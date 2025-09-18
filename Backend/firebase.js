import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { collection, getDocs } from "firebase/firestore"; 

const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmvNIzqyKivJuTBuJP80ufUda_u2wFBmY",
  authDomain: "my-maps-project-154d6.firebaseapp.com",
  projectId: "my-maps-project-154d6",
  storageBucket: "my-maps-project-154d6.firebasestorage.app",
  messagingSenderId: "528294595256",
  appId: "1:528294595256:web:de9b8f39488fd3c66bc24d",
  measurementId: "G-RZTMMTXDG5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);