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




// Local server connection
app.listen(3000, () => {
    console.log(Date());
    console.log("App running on localhost:3000");
});