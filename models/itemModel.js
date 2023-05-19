const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema(
  {
    itemName: { type: String, required: true },
    departmentId: {
      type: mongoose.Schema.ObjectId,
      ref: "DropDown",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

itemSchema.index({ itemName: 1, departmentId: 1 }, { unique: true });

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
