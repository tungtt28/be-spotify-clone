const artistController = require("../controllers/artistController");

const router = require("express").Router();

//add artist
router.post("/", artistController.addArtist);

//get all artist
router.get("/", artistController.getAllArtists);

//get an artist
router.get("/:id", artistController.getAnArtist);

router.put("/:id", artistController.updateArtist);

//DELETE artist
router.delete("/:id", artistController.deleteArtist);

module.exports = router;
