const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
  checkSlotsAvailabilityController,
  userAppointmentsController,
  updateUserProfileController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
// loginController
// registerController

const router = express.Router();

// login
router.post("/login", loginController);

// register
router.post("/register", registerController);
// AUTH || POST
router.post("/getUserData", authMiddleware, authController);
// Apply Doctor || POST
router.post("/apply-doctor", authMiddleware, applyDoctorController);

// Get All Notifications -Doctor || POST
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);

// Delete All Notifications -Doctor ||
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

// Book An Appointment
router.post("/book-appointment", authMiddleware, bookAppointmentController);

router.post(
  "/check-Availity",
  authMiddleware,
  checkSlotsAvailabilityController
);

// Update User Profile
router.post("/userdata-update", authMiddleware, updateUserProfileController);

router.get("/user-appointments", authMiddleware, userAppointmentsController);

module.exports = router;
