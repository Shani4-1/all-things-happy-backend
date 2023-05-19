const db = require("../db/dbConfig.js");

const getAllSongs = async () => {
  try {
    const allSongs = await db.any("SELECT * FROM songs");
    return allSongs;
  } catch (error) {
    return error;
  }
};

const getOneSong = async (id) => {
  try {
    const song = await db.one(`SELECT * FROM songs WHERE id=${id}`);
    return song;
  } catch (error) {
    return error;
  }
};

const addNewSong = async (song) => {
  try {
    const newSong = await db.one(
      `
            INSERT INTO 
            songs(genre_id, title, song_url, artist, length)
            VALUES
            ($1, $2, $3, $4, $5)
            RETURNING *;`,
      [song.genre_id, song.title, song.song_url, song.artist, song.length]
    );
    console.log(newSong);
    return newSong;
  } catch (error) {
    return error;
  }
};

const updateSong = async (id, song) => {
  try {
    const updatedSong = await db.one(
      `
        UPDATE songs SET genre_id=$1, title=$2, song_url=$3, artist=$4, length=$5, id=$6 RETURNING *`,
      [song.genre_id, song.title, song.song_url, song.artist, song.length, id]
    );
    console.log(updatedSong);
    return updatedSong;
  } catch (error) {
    return error;
  }
};

const deleteSong = async (id) => {
  try {
    const deletedSong = await db.one(
      `
        DELETE FROM songs WHERE id=$1 RETURNING *`,
      id
    );
    console.log(deletedSong);
    return deletedSong;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllSongs,
  getOneSong,
  addNewSong,
  updateSong,
  deleteSong,
};
