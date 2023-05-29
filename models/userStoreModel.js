const mongoose = require("mongoose");

const userStoreSchema = new mongoose.Schema(
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
    receivedQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false }
);

const UserStore = mongoose.model("UserStore", userStoreSchema);
module.exports = UserStore;
