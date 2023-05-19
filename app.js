const express = require('express');
const cors = require('cors');
const eventsController = require("./controllers/eventscontrollers.js");
const songsController = require("./controllers/songsControllers.js")
const recipesController = require("./controllers/recipesControllers.js")
const quotesController = require("./controllers/quotesControllers.js");



const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to My Happy Place');
});

app.use("/events", eventsController);
app.use("/songs", songsController);
app.use("/recipes", recipesController);
app.use("/quotes", quotesController);


app.get("*", (req, res) => {
    res.status(404).send("Page not found");
});

module.exports = app;
