const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema(
  {
    itemName: { type: String, lowercase: true, unique: true, required: true },
  },
  { timestamps: true, versionKey: false }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
