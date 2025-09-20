import fs from 'fs';
import  { initializeApp, applicationDefault, cert } from "firebase-admin/app"
import  { getFirestore, Timestamp, FieldValue, Filter } from "firebase-admin/firestore"
// import serviceAccount from "./my-maps-project-154d6-firebase-adminsdk-fbsvc-862737e7c0.json"
const serviceAccount = JSON.parse(
    fs.readFileSync("./serviceAccountKey.json", "utf8")
);
initializeApp({

  credential: cert(serviceAccount)
});

export const db = getFirestore();