const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema([
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Request must belong to a user"],
    },
    departmentId: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Request must belong to a department"],
    },
    itemId: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Request must belong to a item"],
    },
    requiredQuantity: {
      type: Number,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "accepted", "proccessing", "arriving today"],
        message:
          "Key is either: pending, accepted, proccessing, arriving today",
      },
      default: "pending",
    },
  },
]);

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
