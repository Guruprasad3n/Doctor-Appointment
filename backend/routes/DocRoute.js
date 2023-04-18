const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getDoctorInfoController, updateProfileController, getDoctorByIdCOntorller, doctorAppointmentController, updateStatusController } = require("../controllers/doctorController");
const { route } = require("./userRoutes");
const router = express.Router();

router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

// Post And Update The Data
router.post("/updateProfile", authMiddleware, updateProfileController )


// Post And get Single Doctor Information
router.post("/getDoctorById", authMiddleware, getDoctorByIdCOntorller)

router.get("/doctor-appointment", authMiddleware, doctorAppointmentController)

router.post("/update-status", authMiddleware, updateStatusController)

module.exports = router;
