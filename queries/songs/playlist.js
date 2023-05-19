const db = require("../../db/dbConfig.js");

const getAllPlaylist = async () => {
    try {
        const allPlaylist = await db.any(`SELECT * FROM playlist`);
        return allPlaylist;
    } catch (error) {

        return error;
    }
    
};

const getOnePlaylist = async (id) => {
    try {
        const playlist = await db.one(`SELECT * FROM playlist WHERE id=${id}`);
        return playlist;
    } catch (error) {
        return error;
    }
};

const addNewPlaylist = async (playlist) => {
    try {
        const newPlaylist = await db.one(`
        INSERT INTO 
        playlist (name, song_id, song_genre_id)
        VALUES
        ($1, $2, $3)
        RETURNING *;`,
        [playlist.name, playlist.song_id, playlist.song_genre_id]
        );
        return newPlaylist
    } catch (error) {
        return error;
    }
};

const updatePlaylist = async (id, playlist) => {
    try {
        const updatedPlaylist = await db.one(`
        UPDATE playlist SET name=$1, song_id=$2, song_genre_id=$3, id=$4 RETURNING *`,
        [playlist.name, playlist.song_id, playlist.song_genre_id, id]
        );
        return updatedPlaylist;
    } catch (error) {
        return error;
    }
};

const deletePlaylist = async (id) => {
    try {
        const deletedPlaylist = await db.one(`
        DELETE FROM playlist WHERE id=$1 RETURNING *`,
        id
        );
        return deletedPlaylist;
    } catch (error) {
        return error;
    }
};

module.exports = {
    getAllPlaylist,
    getOnePlaylist,
    addNewPlaylist,
    updatePlaylist,
    deletePlaylist
};