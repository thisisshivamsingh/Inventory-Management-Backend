const Store = require("../models/storeModel");

exports.storeCreate = async (req, res, next) => {
  try {
    const doc = await Store.create(req.body);
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
