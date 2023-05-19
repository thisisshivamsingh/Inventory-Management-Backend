const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    trim: true,
  },
  departmentId: {
    type: mongoose.Schema.Object,
    ref: "DropDown",
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
