const express = require("express");
const departmentController = require("../controllers/departmentController");
const router = express.Router();

router
  .route("/")
  .get(departmentController.getDepartment)
  .post(departmentController.createDepartment);

router
  .route("/:id")
  .get(departmentController.getDepartmentById)
  .patch(departmentController.updateDepartment)
  .delete(departmentController.deleteDepartment);

module.exports = router;
