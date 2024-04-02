const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  year: {
    type: Number,
  },
  song: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
  playlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Playlist",
    },
  ],
});

const songSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  publishedDate: {
    type: String,
  },
  playlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Playlist",
    },
  ],
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
  },
});

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
  },

  song: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
});

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  playlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Playlist",
    },
  ],
});

let Song = mongoose.model("Song", songSchema);
let Artist = mongoose.model("Artist", artistSchema);
let Playlist = mongoose.model("Playlist", playlistSchema);
let Category = mongoose.model("Category", categorySchema);

module.exports = { Song, Artist, Playlist, Category };
