const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    departmentId: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Order must belong to a department"],
    },
    orderQuantity: { type: Number },
    fulfilledAt: { type: Date },
    status: {
      type: String,
      enum: { values: ["Pending", "Processed"] },
      default: "Pending",
    },
    itemId: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Order must belong to a item"],
    },
    receivedQuantity: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
