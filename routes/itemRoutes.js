const express = require("express");
const itemController = require("../controllers/itemController");
const router = express.Router();

router.route("/").get(itemController.getItem).post(itemController.createItem);

module.exports = router;
