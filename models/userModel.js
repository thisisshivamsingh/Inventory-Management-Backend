const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      trim: true,
    },
    departmentId: {
      type: mongoose.Schema.ObjectId,
      ref: "Department",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.index({ userName: 1, departmentId: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
