const Item = require("../models/itemModel");

exports.createItem = async (req, res, next) => {
  try {
    const itemInLower = req.body.itemName.toLowerCase();
    const checkPresent = await Item.findOne({ itemName: itemInLower });

    if (!checkPresent) {
      const doc = await Item.create({ itemName: itemInLower });
      res.status(200).json({
        message: "success",
        data: doc,
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "Item is already Present.",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getItem = async (req, res, next) => {
  try {
    const query = Item.find();

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

exports.deleteItem = async (req, res, next) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
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

exports.updateItem = async (req, res, next) => {
  try {
    const itemInLower = req.body.itemName.toLowerCase();
    const doc = await Item.findByIdAndUpdate(
      req.params.id,
      { itemName: itemInLower },
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
