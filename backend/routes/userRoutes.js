const express = require("express");
const { loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
// loginController
// registerController

const router = express.Router();

// login
router.post("/login", loginController)

// register
router.post("/register", registerController)
// AUTH || POST
router.post("/getUserData", authMiddleware, authController)
// Apply Doctor || POST 
router.post("/apply-doctor", authMiddleware, applyDoctorController)


// Get All Notifications -Doctor || POST
router.post("/get-all-notification", authMiddleware, getAllNotificationController)



// Delete All Notifications -Doctor || 
router.post("/delete-all-notification", authMiddleware, deleteAllNotificationController)


module.exports = router