const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: mongoose.Schema.ObjectId,
    unique: true,
    trim: true,
  },
});
