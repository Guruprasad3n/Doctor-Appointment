const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllUDoctorsController,
  getAllUsersController,
  changeAccountStatusController,
} = require("../controllers/adminController");
const router = express.Router();

// Get Method || Users
router.get("/getAllUsers", authMiddleware, getAllUsersController);

// Get Method || Doctors
router.get("/getAllDoctors", authMiddleware, getAllUDoctorsController);

// Account Post Status
router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);

module.exports = router;
