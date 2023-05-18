const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  departmentId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Order must belong to a department"],
  },
  orderQuantity: {
    type: Number,
  },
  fulfilledAt: {
    type: Date,
  },
  status: {
    type: String,
    required: [true, "Status is Required"],
    enum: {
      values: ["order", "shipped", "out for delivery", "arriving today"],
      message:
        "Key is either: order, shipped, out for delivery, arriving today",
    },
  },
  itemId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Order must belong to a item"],
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
