const express = require("express");
const app = express(); // create express app
const path = require("path");

// app.get("/", (req, res) => {
//   res.send("This is from express.js");
// });
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static(path.join(__dirname, "..", "public")));

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});