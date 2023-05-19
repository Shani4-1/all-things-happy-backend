const express = require("express");

const events = express.Router();

const validateEvent = require("../../validations/eventValidators/eventValidator.js")
const {
    getAllEvents,
    getOneEvent
} = require("../..//queries/events/events.js");



events.get("/", async (req, res) => {
    const {error, result} = await getAllEvents();
    if (error) {
        res.status(500).json({error: "server error"})
    } else {
        res.status(200).json(result);
    }
});

events.get("/:id", async (req, res) => {
    const {id} = req.params;
    const event = await getOneEvent(id);
    if (!event.error) {
        res.status(200).json(event)
    } else if (event.error.code === 0) {
        res.status(404).json({ error: "event not found"})
    }
});


module.exports = events;