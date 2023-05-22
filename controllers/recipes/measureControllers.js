const express = require("express");

const measure = express.Router();

const {
    getAllMeasurements,
    getOneMeasurement,
    addNewMeasurement,
    updateMeasurement,
    deleteMeasurement
} = require("../../queries/recipes/measure.js");

const validateMeasurement = require("../../validations/recipeValidators/measureValidator.js");

measure.get("/", async (req, res) => {
    const allMeasurements = await getAllMeasurements();
    if (!allMeasurements.error) {
        res.status(200).json(allMeasurements);
    } else {
        res.status(500).json({error: "server error"});
    }
});

measure.get("/:id", async (req, res) => {
    const { id } = req.params;
    const measurement = await getOneMeasurement(id);

    if (!measurement.error) {
        res.status(200).json(measurement);
    } else if (measurement.error.code === 0) {
        res.status(404).json({error: "measurement not found"});
    } else {
        res.status(500).json({error: "server error"});
    }
});

measure.post("/:id", validateMeasurement, (req, res, next) => {
    const {name} = req.body;
    if (!name) {
        return res.status(422).json({error: "body requires name"});
    } 
    return next();
},
async (req, res) => {
    try {
        const {name} = req.body;
        const newMeasurement = await addNewMeasurement([
            name
        ]);
        return res.status(201).json(newMeasurement);
    } catch (error) {
        return res.status(500).json({error: "server error"})
    }
});

measure.put("/:id", validateMeasurement, async (req, res) => {
    const { id } = req.params;
    const measurement = req.body;
    try {
        const updatedMeasurement = await updateMeasurement(id, measurement); 
        if (updatedMeasurement.id) {
            res.status(200).json(updatedMeasurement);
        } else {
            res.status(404).json({error: "measurement not found"});
        }
    } catch (error) {
        res.status(500).json({error: "server error"})
    }
});

measure.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedMeasurement = await deleteMeasurement(id);
    
    if (deletedMeasurement.id) {
        res.status(201).json(deletedMeasurement);
    } else {
        res.status(404).json({error: "measurement not found"});
    }
});

module.exports = measure;