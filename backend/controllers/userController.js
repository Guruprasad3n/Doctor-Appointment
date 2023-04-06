const userModel = require("../models/userMode");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
// SIgnup
const registerController = async (req, res) => {
  try {
    const existUser = await userModel.findOne({ email: req.body.email });
    if (existUser) {
      return res
        .status(200)
        .send({ message: `user Already Exist`, success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    const newUser = new userModel(req.body);
    await newUser.save();
    return res
      .status(201)
      .send({ message: `Registration Success`, success: true });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ success: false, message: `Something Wrong While Registration` });
  }
};

// Login
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User Not Found", success: false });
    }
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      return res
        .status(200)
        .send({ message: "Invalid Email or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: `Error in Login ${e.message}` });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "user Not Found", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "auth Error", success: false, e });
  }
};

// Apply Doctor Controller
const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied for a Doctor Account `,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res
      .status(201)
      .send({ success: true, message: `Doctor Account Applied Successfully` });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ success: false, e, message: `Error While Appling Doctor` });
  }
};
module.exports = {
  loginController,
  registerController,
  authController,
  applyDoctorController,
};
