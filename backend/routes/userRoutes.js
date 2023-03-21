const express = require("express");
const { loginController, registerController, authController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
// loginController
// registerController

const router = express.Router();

// login
router.post("/login", loginController)

// register
router.post("/register", registerController)

router.post("/getUserData", authMiddleware, authController)

module.exports = router