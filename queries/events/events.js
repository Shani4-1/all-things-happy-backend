const db = require('../../db/dbConfig.js');

const getAllEvents = async () => {
    try {
        const result = await db.any("SELECT * FROM events");
        return { result };
    }catch (error) {
        return { error };
    }
};

const getOneEvent = async (id) => {
    try {
        const event = await db.one(`SELECT * FROM events WHERE id=${id}`);
        return event;
    }catch (error) {
        return error
    }
};

module.exports = {
    getAllEvents,
    getOneEvent
}