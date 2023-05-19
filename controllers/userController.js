const User = require("../models/userModel");

exports.createUser = async (req, res, next) => {
  try {
    const doc = await User.create(req.body);
    res.status(200).json({
      message: "success",
      data: doc,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
