const { Playlist, Artist, Song } = require("../model/model");

const playlistController = {
  //ADD A Playlist
  addPlaylist: async (req, res) => {
    try {
      const newPlaylist = new Playlist(req.body);
      const savedPlaylist = await newPlaylist.save();

      if (req.body.song) {
        const song = Song.findById(req.body.song);
        await song.updateOne({ $push: { playlist: savedPlaylist._id } });
      }
      if (req.body.artist) {
        const artist = Artist.findById(req.body.artist);
        await artist.updateOne({ $push: { playlist: savedPlaylist._id } });
      }
      res.status(200).json(savedPlaylist);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //GET ALL Playlists
  getAllPlaylists: async (req, res) => {
    try {
      const playlists = await Playlist.find()
        .populate("song")
        .populate("artist");
      res.status(200).json(playlists);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET AN Playlist
  getAPlaylists: async (req, res) => {
    try {
      const playlist = await Playlist.findById(req.params.id)
        .populate("song")
        .populate("artist");
      res.status(200).json(playlist);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE Playlist
  updatePlaylist: async (req, res) => {
    try {
      const playlist = await Playlist.findById(req.params.id);
      await playlist.updateMany({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE Playlist
  deletePlaylist: async (req, res) => {
    try {
      await Artist.updateMany(
        { artist: req.params.id },
        { $pull: { artist: req.params.id } }
      );
      await Playlist.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //them nhieu
  updatePlaylists: async (req, res) => {
    try {
      const playlist = await Playlist.findById(req.params.id);
      if (!playlist) {
        return res.status(404).json({ error: "Playlist not found" });
      }

      const songsToAdd = req.body.songs; // Assuming an array of song IDs is sent in the request body
      if (songsToAdd && songsToAdd.length > 0) {
        // Iterate over each song ID and update the playlist
        for (const songId of songsToAdd) {
          const song = await Song.findById(songId);
          if (!song) {
            console.warn(`Song with ID ${songId} not found, skipping...`);
            continue; // Skip to the next song if the current one is not found
          }
          // Add the playlist ID to the song's playlist array
          song.playlist.push(playlist._id);
          await song.save();
        }
      }

      // Optionally, you can also handle updating other properties of the playlist here
      await playlist.updateOne({ $set: req.body });

      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = playlistController;
