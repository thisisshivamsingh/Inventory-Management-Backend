const express = require("express");
const storeController = require("../controllers/storeController");
const router = express.Router();

router.route("/").post(storeController.storeCreate);

module.exports = router;
