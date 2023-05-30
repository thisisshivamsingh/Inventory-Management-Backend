const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Request must belong to a user"],
    },
    departmentId: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Request must belong to a department"],
    },
    itemInfo: [
      {
        itemId: {
          type: mongoose.Schema.ObjectId,
          ref: "Item",
          required: [true, "Request must belong to a item Id"],
        },
        requiredQuantity: {
          type: Number,
          required: [true, "Request must contain a count"],
        },
      },
    ],
    status: {
      type: String,
      enum: {
        values: ["pending", "processed"],
        message: "Key is either: pending, processed",
      },
      default: "pending",
    },
  },
  { timestamps: true, versionKey: false }
);

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
