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

module.exports = router;
