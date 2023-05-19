const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    trim: true,
  },
  role: {
    type: String,
    required: [true, "Role is Required"],
    enum: {
      values: ["user", "departmentHead"],
      message: "Role is either: user, departmentHead",
    },
  },
  departmentId: {
    type: mongoose.Schema.ObjectId,
    ref: "DropDown",
    required: true,
  },
});

userSchema.index({ userName: 1, departmentId: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
