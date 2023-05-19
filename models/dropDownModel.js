const mongoose = require("mongoose");

const dropDownSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: [true, "Key is Required"],
      enum: {
        values: ["department"],
        message: "Key is either: department",
      },
    },
    value: {
      type: String,
      required: [true, "Value is Required"],
    },
  },
  { timestamps: true, versionKey: false }
);

dropDownSchema.index({ key: 1, value: 1 }, { unique: true });

const DropDown = mongoose.model("DropDown", dropDownSchema);

module.exports = DropDown;
