const express = require("express");
const orderController = require("../controllers/orderController");
const router = express.Router();

router
  .route("/")
  .get(orderController.getOrder)
  .post(orderController.createOrder);

module.exports = router;
