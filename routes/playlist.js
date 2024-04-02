const playlistController = require("../controllers/playlistController");

const router = require("express").Router();

//ADD A PLAYLIST
router.post("/", playlistController.addPlaylist);

router.get("/", playlistController.getAllPlaylists);

router.get("/:id", playlistController.getAPlaylists);

router.put("/:id", playlistController.updatePlaylists);

//DELETE PLAYLIST
router.delete("/:id", playlistController.deletePlaylist);

module.exports = router;
