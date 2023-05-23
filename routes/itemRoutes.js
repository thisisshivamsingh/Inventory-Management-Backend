const express = require("express");
const itemController = require("../controllers/itemController");
const router = express.Router();

router.route("/").get(itemController.getItem).post(itemController.createItem);

router
  .route("/:id")
  .patch(itemController.updateItem)
  .delete(itemController.deleteItem);

module.exports = router;
