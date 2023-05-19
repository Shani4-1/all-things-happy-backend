const db = require("../../db/dbConfig.js");

const getAllSongGenres = async () => {
    try {
        const allGenres = await db.any(`SELECT * FROM song_genres`);
        return allGenres;
    } catch (error) {
        return error;
    }
};

const getOneGenre = async (id) => {
    try {
        const genre = await db.one(`SELECT * FROM song_genres WHERE id=${id}`);
        return genre;
    } catch (error) {

        return error;
    }
    
};

const addNewGenre = async () => {
    try {
        const newGenre = await db.one(`
        INSERT INTO 
        song_genres (genre_type)
        VALUES
        ($1)
        RETURNING *;`,
        [genre.genre_type]
        );
        return newGenre;
    } catch (error) {
        return error
    }
};

const updateGenre = async (id, genre) => {
    try {
        const updatedGenre = await db.one(`
        UPDATE song_genres SET genre_type=$1, id=$2 RETURNING *`,
        [genre.genre_type, id]
        );
        return updatedGenre;
    } catch (error) {
        return error;
    }
};

const deleteGenre = async (id) => {
    try {
        const deletedGenre = await db.one(`
        DELETE FROM song_genres WHERE id=$1 RETURNING *`, 
        id
        );
        return deletedGenre;
    } catch (error) {
        return error;
    }
};

module.exports = {
    getAllSongGenres,
    getOneGenre,
    addNewGenre,
    updateGenre,
    deleteGenre
}
