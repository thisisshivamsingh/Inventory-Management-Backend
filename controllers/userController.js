const User = require("../models/userModel");

exports.createUser = async (req, res, next) => {
  try {
    const { userName, departmentId } = req.body;
    const userNameInLower = userName.toLowerCase();
    const checkPresent = await User.findOne({
      userName: userNameInLower,
    });
    if (!checkPresent) {
      const doc = await User.create({
        userName: userNameInLower,
        departmentId: departmentId,
      });
      res.status(200).json({
        message: "success",
        data: doc,
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "User is already Present.",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const query = User.find().populate("departmentId");

    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    // page=3&limit=10, 1-10, page 1, 11-20, page 2, 21-30 page 3
    const doc = await query.skip(skip).limit(limit);
    res.status(200).json({
      message: "success",
      data: doc,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { userName = null } = req.body;
    const doc = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body, userName: userName?.toLowerCase() },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
