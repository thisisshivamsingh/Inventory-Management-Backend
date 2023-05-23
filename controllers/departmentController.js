const Department = require("../models/departmentModel");

exports.createDepartment = async (req, res, next) => {
  try {
    const departmentInLower = req.body.departmentName.toLowerCase();
    const checkPresent = await Department.findOne({
      departmentName: departmentInLower,
    });
    if (!checkPresent) {
      const doc = await Department.create({
        departmentName: departmentInLower,
      });
      res.status(200).json({
        message: "success",
        data: doc,
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "Department is already Present.",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getDepartment = async (req, res, next) => {
  try {
    const query = Department.find().populate("User");

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
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getDepartmentById = async (req, res, next) => {
  try {
    const doc = await Department.findById(req.params.id).populate("User");
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

exports.updateDepartment = async (req, res, next) => {
  try {
    const doc = await Department.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
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
