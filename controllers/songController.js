const { Song, Artist, Playlist } = require("../model/model");

const songController = {
  //ADD A SONG
  addSong: async (req, res) => {
    try {
      const newSong = new Song(req.body);
      const savedSong = await newSong.save();
      if (req.body.artist) {
        const artist = Artist.findById(req.body.artist);
        await artist.updateOne({ $push: { song: savedSong._id } });
      }
      if (req.body.playlist) {
        const playlist = Playlist.findById(req.body.playlist);
        await playlist.updateOne({ $push: { song: savedSong._id } });
      }
      res.status(200).json(savedSong);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET ALL SONG
  getAllSongs: async (req, res) => {
    try {
      const songs = await Song.find().populate("playlist").populate("artist");
      res.status(200).json(songs);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET A SONG
  getASong: async (req, res) => {
    try {
      const song = await Song.findById(req.params.id)

        .populate("playlist")
        .populate("artist");
      res.status(200).json(song);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE SONG
  updateSong: async (req, res) => {
    try {
      const song = await Song.findById(req.params.id);
      await song.updateOne({ $set: req.body });
      if (!song) {
        await song.updateOne({ $push: req.body });
      }
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE SONG
  deleteSong: async (req, res) => {
    try {
      await Artist.updateMany(
        { artist: req.params.id },
        { $pull: { artist: req.params.id } }
      );
      await Song.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = songController;
