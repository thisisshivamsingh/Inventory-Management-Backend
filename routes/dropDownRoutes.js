const express = require("express");
const dropDownController = require("../controllers/dropDownController");
const router = express.Router();

router.route("/").post(dropDownController.createDropDown);
router.route("/:resource").get(dropDownController.getDropDown);

module.exports = router;
