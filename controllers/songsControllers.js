const express = require("express");
const songs = express.Router();

const {
    getAllSongs,
    getOneSong,
    addNewSong,
    updateSong,
    deleteSong
} = require("../queries/songs.js");

const validateSong  = require("../validations/songValidator");

songs.get("/", async (req, res) => {
    const allSongs  = await getAllSongs();
    if (!allSongs.error) {
        res.status(200).json(allSongs);
    } else {
        res.status(500).json({ error: "server error"});
    } 
});

songs.get("/:id", async (req, res) => {
    const { id } = req.params;
    const song = await getOneSong(id);
    if (!song.error) {
        res.status(200).json(song);
    } else if (song.error.code === 0) {
        res.status(404).json({error: "song not found"});
    }else {
        res.status(500).json({error: "server error"});
    }
});

songs.post("/", validateSong, (req, res, next) => {
    const {genre_id, title, song_url, artist, length} = req.body;
    if (!genre_id || !title || !song_url || !artist || !length) {
        res.status(422).json({error: "body requires genre_id, title, song_url, artist, length"});
    }
    return next();
},
async (req, res) => {
    try {
        const {genre_id, title, song_url, artist, length} = req.body;
        const newSong = await addNewSong({
            genre_id,
            title,
            song_url,
            artist,
            length
        });
        return res.status(201).json(newSong);
    } catch (error) {
        return res.status(500).json({error: "server error"})
    }
});
songs.put("/:id", validateSong, async (req, res) => {
    const { id } = req.params;
    const song = req.body;

    try {
        const updatedSong = await updateSong(id, song);
        if (updatedSong.id) {
            res.status(200).json(updatedSong);
        } else {
            res.status(404).json({error: "song not found"})
        }
    } catch (error) {
        res.status(500).json({error: "server error"})
    }
});

songs.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedSong = await deleteSong(id);
    if (deletedSong.id) {
        res.status(201).json(deletedSong)
    } else {
        res.status(404).json({error: "song not found"})
    }
})


module.exports = songs;