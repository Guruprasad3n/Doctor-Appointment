const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getDoctorInfoController, updateProfileController, getDoctorByIdCOntorller } = require("../controllers/doctorController");
const router = express.Router();

router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

// Post And Update The Data
router.post("/updateProfile", authMiddleware, updateProfileController )


// Post And get Single Doctor Information
router.post("/getDoctorById", authMiddleware, getDoctorByIdCOntorller)

module.exports = router;
