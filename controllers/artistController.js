const { Artist, Song, Playlist } = require("../model/model");

const artistController = {
  //add artist
  addArtist: async (req, res) => {
    try {
      const newArtist = new Artist(req.body);
      const savedArtist = await newArtist.save();
      res.status(200).json(savedArtist);
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  //GET ALL artist
  getAllArtists: async (req, res) => {
    try {
      const artists = await Artist.find().populate("song").populate("playlist");
      res.status(200).json(artists);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET AN artist
  getAnArtist: async (req, res) => {
    try {
      const artist = await Artist.findById(req.params.id)
        .populate("song")
        .populate("playlist");
      res.status(200).json(artist);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE artist
  updateArtist: async (req, res) => {
    try {
      const artist = await Artist.findById(req.params.id);
      await artist.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE artist
  deleteArtist: async (req, res) => {
    try {
      await Song.updateMany({ artist: req.params.id }, { artist: null });
      await Playlist.updateMany(
        { playlist: req.params.id },
        { playlist: null }
      );
      await Artist.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = artistController;
