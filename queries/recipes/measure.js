const db = require("../../db/dbConfig.js");

const getAllMeasurements = async () => {
    try {
        const allMeasurements = await db.any(`SELECT * FROM measure`);
        return allMeasurements;
    } catch (error) {
        return error;
    }
};

const getOneMeasurement = async (id) => {
    try {
        const measurement = await db.one(`SELECT * FROM measure WHERE id=${id}`);
        return measurement;
    } catch (error) {
        return error;
    }
};

const addNewMeasurement = async (measurement) => {
    try {
        const newMeasurement = await db.one(`
        INSERT INTO 
        measure (name)
        VALUES
        ($1)
        RETURNING *;`,
        [measurement.name]
        );
        return newMeasurement;
    } catch (error) {
        return error;
    }
};

const updateMeasurement = async (id, measurement) => {
    try {
        const updatedMeasurement = await db.one(`
        UPDATE measure SET name=$1, id=$2 RETURNING *`,
        [measurement.name, id]
        );
        return updatedMeasurement;
    } catch (error) {
        return error;
    }
};

const deleteMeasurement = async (id) => {
    try {
        const deletedMeasurement = await db.one(`
        DELETE FROM measure WHERE id=$1 RETURNING *`,
        id
        );
        return deletedMeasurement;
    } catch (error) {
        return error;
    }
};

module.export = {
    getAllMeasurements,
    getOneMeasurement,
    addNewMeasurement,
    updateMeasurement,
    deleteMeasurement
};