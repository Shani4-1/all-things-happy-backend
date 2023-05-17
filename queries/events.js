const db = require('../db/dbConfig.js');

const getAllEvents = async () => {
    try {
        const result = await db.any("SELECt * FROM events");
        return { result };
    }catch (error) {
        return { error };
    }
};


module.exports = {
    getAllEvents
}