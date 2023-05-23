const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    departmentName: {
      type: String,
      required: [true, "Department Name is Required"],
    },
    departmenHeadId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);

departmentSchema.index(
  { departmentName: 1, departmenHeadId: 1 },
  { unique: true }
);

const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;
