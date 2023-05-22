const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    departmentName: {
      type: String,
      required: [true, "Department Name is Required"],
    },
    departmentId: {
      type: mongoose.Schema.ObjectId,
      ref: "DropDown",
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);

const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;
