const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Store must belong to a item"],
  },
  departmentId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Store must belong to a department"],
  },
  quantity: {
    type: Number,
  },
});

storeSchema.index({ itemId: 1, departmentId: 1 }, { unique: true });

const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
