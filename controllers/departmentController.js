const Department = require("../models/departmentModel");
const mongoose = require("mongoose");

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
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;

    const doc = await Department.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "departmentHeadId",
          foreignField: "_id",
          as: "info",
        },
      },
      {
        $unwind: {
          path: "$info",
          preserveNullAndEmptyArrays: true,
        },
      },
      { $skip: (page - 1) * limit },
      { $limit: limit || 100 },
    ]);
    // Department.find().populate("User");

    // Pagination

    // page=3&limit=10, 1-10, page 1, 11-20, page 2, 21-30 page 3

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
    console.log("<<<>>>", req.params.id);
    const doc = await Department.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "departmentHeadId",
          foreignField: "_id",
          as: "info",
        },
      },
      {
        $unwind: {
          path: "$info",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    res.status(200).json({
      message: "success",
      data: doc[0],
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

exports.deleteDepartment = async (req, res, next) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
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
