const mongoose = require("mongoose");

const dropDownSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: [true, "Key is Required"],
      enum: {
        values: ["item", "department", "user"],
        message: "Key is either: item, department, user",
      },
    },
    value: {
      type: String,
      required: [true, "Value is Required"],
    },
  },
  { timestamps: true, versionKey: false }
);

const DropDown = mongoose.model("DropDown", dropDownSchema);

module.exports = DropDown;
