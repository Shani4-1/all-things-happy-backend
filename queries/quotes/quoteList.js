const db = require("../../db/dbConfig.js");

const getAllList = async () => {
    try {
        const allList = await db.any(`SELECT * FROM quote_list`);
        return allList;
    } catch (error) {
        return error;
    }
};

const getOneList = async (id) => {
    try {
        const quoteList = await db.one(`SELECT * FROM quote_list WHERE id=${id}`);
        return quoteList;
    } catch (error) {

        return error;
    }
    
};

const addNewList = async (quoteList) => {
    try {
        const newList = await db.one(`
        INSERT INTO
        quote_list(quote_id, category_id)
        VALUES
        ($1, $2)
        RETURNING *;`,
        [quoteList.quote_id, quoteList.category_id]
        );
        return newList;
    } catch (error) {
        return error;
    }
};

const updateList = async (id, quoteList) => {
    try {
        const updatedList = await db.one(`
        UPDATE quote_list SET quote_id=$1, category_id=$2, id=$3 RETURNING *`, 
        [quoteList.quote_id, quoteList.category_id, id]
        );
        return updatedList;
    } catch (error) {
        return error;
    }
};

const deleteList = async (id) => {
    try {
        const deletedList = await db.one(`
        DELETE FROM quote_list WHERE id=$1 RETURNING *`,
        id
        );
        return deletedList;
    } catch (error) {
        return error;
    }
};

module.exports = {
    getAllList,
    getOneList,
    addNewList,
    updateList,
    deleteList
};