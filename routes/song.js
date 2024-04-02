const songController = require("../controllers/songController");

const router = require("express").Router();

//ADD A SONG
router.post("/", songController.addSong);

router.get("/", songController.getAllSongs);

router.get("/:id", songController.getASong);

router.put("/:id", songController.updateSong);

//DELETE SONG
router.delete("/:id", songController.deleteSong);

module.exports = router;
