const Order = require("../models/orderModel");

exports.orderCreate = async (req, res, next) => {
  try {
    const doc = await Order.create(req.body);
    res.status(200).json({
      message: "success",
      data: doc,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
