const express = require("express");
const songGenres = express.Router();

const {
  getAllSongGenres,
  getOneGenre,
  addNewGenre,
  updateGenre,
  deleteGenre,
} = require("../../queries/songs/song_genres.js");

songGenres.get("/", async (req, res) => {
  const allGenres = await getAllSongGenres();
  if (!allGenres.error) {
    res.status(200).json(allGenres);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

songGenres.get("/:id", async (req, res) => {
  const { id } = req.params;
  const genre = await getOneGenre(id);

  if (!genre.error) {
    res.status(200).json(genre);
  } else if (genre.error.code) {
    res.status(404).json({ error: "genre not found" });
  } else {
    res.status(500).json({ error: "server error" });
  }
});

songGenres.post("/", async (req, res) => {
  try {
    const { genre_type } = req.body;
    const newGenre = await addNewGenre({ genre_type });
    return res.status(201).json(newGenre);
  } catch (error) {
    return res.status(500).json({ error: "server error" });
  }
});

songGenres.put("/:id", async (req, res) => {
  const { id } = req.params;
  const genre = req.body;

  try {
    const updatedGenre = await updateGenre(id, genre);
    if (updatedGenre.id) {
      res.status(200).json(updatedGenre);
    } else {
      res.status(404).json({ error: "genre not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "server error" });
  }
});

songGenres.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedGenre = await deleteGenre(id);
  if (deletedGenre.id) {
    res.status(200).json(deletedGenre);
  } else {
    res.status(404).json({ error: "genre not found" });
  }
});

module.exports = songGenres;
