const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

const requestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Request must belong to a user"],
    },
    departmentId: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Request must belong to a department"],
    },
    requestId: { type: String, unique: true },
    itemInfo: [
      {
        itemId: {
          type: mongoose.Schema.ObjectId,
          ref: "Item",
          required: [true, "Request must belong to a item Id"],
        },
        requiredQuantity: {
          type: Number,
          required: [true, "Request must contain a count"],
        },
        status: {
          type: String,
          enum: {
            values: ["pending", "processed"],
            message: "Key is either: pending, processed",
          },
          default: "pending",
        },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

requestSchema.pre("save", async function (next) {
  const doc = this;

  const t = await Counter.findByIdAndUpdate(
    { _id: "requestId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  doc.requestId = "REQ-" + t.seq;

  next();
});

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
