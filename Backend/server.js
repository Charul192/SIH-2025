import path from "path";
import express from "express";
import mongoose from "mongoose";
const app= express();
const PORT=8000
app.use(express.json());
console.log("Hello")
app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`);
});