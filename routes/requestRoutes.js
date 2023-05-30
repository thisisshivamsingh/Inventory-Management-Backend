const express = require("express");
const requestController = require("../controllers/requestController");
const router = express.Router();

router
  .route("/")
  .post(requestController.createRequest)
  .get(requestController.getRequest);

router
  .route("/item-store-request")
  .post(requestController.getItemUserStoreRequestById);

router
  .route("/get-items-count-with-status")
  .post(requestController.getItemsCountWithStatus);

module.exports = router;
