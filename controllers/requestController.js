const Request = require("../models/requestModel");

exports.createRequest = async (req, res, next) => {
  try {
    const doc = await Request.create(req.body);
    res.status(201).json({
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

exports.getRequestsOfUser = async (req, res, next) => {
  try {
    const doc = await Request.find();
    res.status();
  } catch (err) {}
};
