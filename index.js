const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

mongoose
  .connect("mongodb://127.0.0.1:27017/bustrack")
  .then((e) => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
    return res.render("landingpage");
});

app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});