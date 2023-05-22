const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema(
  {
    itemName: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
