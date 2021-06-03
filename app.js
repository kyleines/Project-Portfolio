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


// Setup routes
app.get("/", (req, res) => {
    res.render("index", {projects});
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/:id", (req, res, next) => {
    const {id} = req.params;
    if (projects[id]) {
        res.render("project", {project: projects[id]});
    } else {
        const err = new Error();
        err.status = 404;
        err.message = "You have reached the edge of the matrix, please turn back now.";
        next(err);
    }
});



// 4o4 Error Handler
app.use((req, res) => {
    console.log("4o4 handler called")
    const err = new Error();
    err.status = 404;
    err.message = "You have reached the edge of the matrix, please turn back now.";

    console.log(`\x1b[31m${err.status}: ${err.message}\x1b[0m`);   //  \x1b[31m = red console text
    res.render("page-not-found", {err});                           //  \x1b[0m  = reset console text
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.log("Global handler called");

    if (err.status === 404) {
        console.log(`\x1b[31m${err.status}: ${err.message}\x1b[0m`);
        res.render("page-not-found", {err});
    } else {
        err.status = 500;
        err.message = "Oops, I did something wrong. Or did I?";
        console.log(`\x1b[31m${err.status}: ${err.message}\x1b[0m`);
        res.render("error", {err});
    }
});



// Local server connection
app.listen(3000, () => {
    console.log(`\x1b[1m${Date()}`);                        // \x1b[1m = bright console text
    console.log("App running on localhost:3000\x1b[0m");    // \x1b[0m = reset console text
});