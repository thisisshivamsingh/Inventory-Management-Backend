const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  [
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
            required: [true, "Request must belong to a item Id"],
          },
          requiredQuantity: {
            type: Number,
            required: [true, "Request must contain a count"],
          },
          consumedQuantity: {
            type: Number,
            default: 0,
          },
          receivedQuantity: { type: Number, default: 0 },
        },
      ],
      status: {
        type: String,
        enum: {
          values: ["pending", "proccessed"],
          message: "Key is either: pending, proccessed",
        },
        default: "pending",
      },
    },
  ],
  { timestamps: true, versionKey: false }
);

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
