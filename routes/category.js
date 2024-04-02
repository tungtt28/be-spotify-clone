const categoryController = require("../controllers/categoryController");

const router = require("express").Router();

//add category
router.post("/", categoryController.addCategory);

//get all category
router.get("/", categoryController.getAllCategory);

module.exports = router;
