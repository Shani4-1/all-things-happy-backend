const express = require("express");

const events = express.Router();

const {getAllEvents} = require("../queries/events.js");

events.use("/:eventID");

events.get("/", async (req, res) => {
    const {error, result} = await getAllEvents();
    if (error) {
        res.status(500).json({error: "server error"})
    } else {
        res.status(200).json(result);
    }
});


module.exports = events;