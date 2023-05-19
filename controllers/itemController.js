const Item = require("../models/itemModel");

exports.createItem = async (req, res, next) => {
  try {
    const doc = await Item.create(req.body);
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

exports.getItem = async (req, res, next) => {
  try {
    const filterObj = { departmentId: req.params.departId };
    const query = DropDown.find(filterObj);

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
