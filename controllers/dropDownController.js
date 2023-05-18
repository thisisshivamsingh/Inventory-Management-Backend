const DropDown = require("../models/dropDownModel");

exports.createDropDown = async (req, res, next) => {
  try {
    const doc = await DropDown.create(req.body);
    res.status(201).json({
      status: "success",
      data: doc,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getDropDown = async (req, res, next) => {
  try {
    const filterObj = { key: req.params.resource };
    const query = DropDown.find(filterObj);

    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    // page=3&limit=10, 1-10, page 1, 11-20, page 2, 21-30 page 3
    const doc = await query.skip(skip).limit(limit);
    res.status(200).json({
      message: "success",
      data: {
        data: doc,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
