const db = require("../db/dbConfig.js");

const getAllQuotes = async () => {
    try {

        const allQuotes = await db.any(`SELECT * FROM quotes`);
        return allQuotes
    } catch (error) {
        return error
    }
    
};

const getOneQuote = async (id) => {
    try {
        const quote = await db.one(`SELECT * FROM quotes WHERE id=${id}`);
        return quote;
    } catch (error) {
        return error;
    }
};

const addNewQuote = async(quote) => {
    try {
        const newQuote = await db.one(`
        INSERT INTO quotes (category_id, quotee, quote)
        VALUES
        ($1, $2, $3)
        RETURNING *;`,
        [quote.category_id, quote.quotee, quote.quote]
        );
        return newQuote;
    } catch (error) {
        return error;
    }
};

const updateQuote = async (id, quote) => {
    try {

        const updatedQuote = await db.one(`
        UPDATE quotes SET category_id=$1, quotee=$2, quote=$3, id=$4 RETURNING *`, 
        [quote.category_id, quote.quotee, quote.quote, id]
        );
        return updatedQuote;
    } catch (error) {
        return error;
    }    
};

const deleteQuote = async (id) => {
    try {
    const deletedQuote = await db.one(`
    DELETE FROM quotes WHERE id=$1 RETURNING *`,
    id
    );
    return deletedQuote;
    } catch (error) {
        return error;
    }
};

module.exports = {
    getAllQuotes,
    getOneQuote,
    addNewQuote,
    updateQuote,
    deleteQuote,
};