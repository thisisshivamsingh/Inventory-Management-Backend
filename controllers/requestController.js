const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");
const Request = require("../models/requestModel");
const UserStore = require("../models/userStoreModel");

exports.createRequest = async (req, res, next) => {
  try {
    const { userId, departmentId, itemInfo } = req.body;
    let userStoreDet = [];
    let checkUserStore = [];

    for (let i = 0; i < itemInfo.length; i++) {
      checkUserStore.push([
        { userId: new ObjectId(userId) },
        { departmentId: new ObjectId(departmentId) },
        { itemId: new ObjectId(itemInfo[i].itemId) },
      ]);
      userStoreDet.push({
        userId,
        departmentId,
        itemId: itemInfo[i].itemId,
        requiredQuantity: itemInfo[i].requiredQuantity,
      });
    }

    const doc = await Request.create(req.body);

    let item;
    for (let j = 0; j < checkUserStore.length; j++) {
      const checkPresent = await UserStore.findOneAndUpdate(
        {
          userId: new mongoose.Types.ObjectId(userStoreDet[j].userId),
          departmentId: new mongoose.Types.ObjectId(
            userStoreDet[j].departmentId
          ),
          itemId: new mongoose.Types.ObjectId(userStoreDet[j].itemId),
        },
        { $inc: { requiredQuantity: itemInfo[j].requiredQuantity } },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!checkPresent) {
        item = await UserStore.create(userStoreDet[j]);
      }
    }

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

exports.getRequest = async (req, res, next) => {
  try {
    const query = Request.find();

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

// exports.getItemRequest =

// exports.getRequestsOfUser = async (req, res, next) => {
//   try {
//     const filterObj = { userId: req.params.id };
//     const query = DropDown.find(filterObj);

//     // Pagination
//     const page = req.query.page * 1 || 1;
//     const limit = req.query.limit * 1 || 100;
//     const skip = (page - 1) * limit;

//     // page=3&limit=10, 1-10, page 1, 11-20, page 2, 21-30 page 3
//     const doc = await query.skip(skip).limit(limit);
//     res.status(200).json({
//       message: "success",
//       data: doc,
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };
