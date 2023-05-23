const express = require("express");
const departmentController = require("../controllers/departmentController");
const router = express.Router();

router
  .route("/")
  .get(departmentController.getDepartment)
  .post(departmentController.createDepartment);

router
  .route("/:id")
  .post(departmentController.getDepartmentById)
  .post(departmentController.updateDepartment);

module.exports = router;
