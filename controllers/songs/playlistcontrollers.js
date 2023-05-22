const express = require("express");
const playlist = express.Router();

const {
  getAllPlaylist,
  getOnePlaylist,
  addNewPlaylist,
  updatePlaylist,
  deletePlaylist,
} = require("../../queries/songs/playlist.js");

playlist.get("/", async (req, res) => {
  const allPlaylist = await getAllPlaylist();
  if (!allPlaylist.error) {
    res.status(200).json(allPlaylist);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

playlist.get("/:id", async (req, res) => {
  const { id } = req.params;
  const playlist = await getOnePlaylist(id);

  if (!playlist.error) {
    res.status(200).json(playlist);
  } else if (playlist.error.code) {
    res.status(404).json({ error: "playlist not found" });
  } else {
    res.status(500).json({ error: "server error" });
  }
});

playlist.post("/", async (req, res) => {
  try {
    const { name, song_id, song_genre_id } = req.body;
    const newPlaylist = await addNewPlaylist({
      name,
      song_id,
      song_genre_id,
    });
    return res.status(201).json(newPlaylist);
  } catch (error) {
    return res.status(500).json({ error: "server error" });
  }
});

playlist.put("/:id", async (req, res) => {
  const { id } = req.params;
  const playlist = req.body;

  try {
    const updatedPlaylist = await updatePlaylist(id, playlist);
    if (updatedPlaylist.id) {
      res.status(200).json(updatedPlaylist);
    } else {
      res.status(404).json({ error: "playlist not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "server error" });
  }
});

playlist.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedPlaylist = await deletePlaylist(id);
  if (deletedPlaylist.id) {
    res.status(200).json(deletedPlaylist);
  } else {
    res.status(404).json({ error: "playlist not found" });
  }
});

module.exports = playlist;
