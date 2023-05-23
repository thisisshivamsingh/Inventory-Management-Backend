const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      default: "user",
    },
    departmentId: {
      type: mongoose.Schema.ObjectId,
      ref: "Department",
      required: true,
    },
    isMember: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.index({ userName: 1, departmentId: 1 }, { unique: true });

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
userSchema.pre("save", function (next) {
  this.isMember = true;
  this.role = "user";
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
