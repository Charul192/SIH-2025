import path from "path";
import express from "express";
import mongoose from "mongoose";
import db from "./connectDB.js"
import {ref, get} from "firebase/database"
import {getStops} from "./fetchData.js";
// import {getFirestore, collection, query, where, getDocs} from "firebase/firestore"
const app= express();
const PORT=8000
app.use(express.json());
console.log("Hello")
app.get('/', (req, res)=>{
    res.sendFile('./index.html')
})
app.post(`/trackbus/:value`, (res, req)=>{
    const {value} = req.params;





})
app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`);
});