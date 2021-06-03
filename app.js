const express = require("express");
const path = require("path");
const {projects} = require("./data.json");

// Create instance of Express
const app = express();

// Setup views & view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Serve static files
app.use("/static",express.static(path.join(__dirname, "public")));




// Local server connection
app.listen(3000, () => {
    console.log(Date());
    console.log("App running on localhost:3000");
});