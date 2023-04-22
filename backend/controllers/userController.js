const userModel = require("../models/userMode");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const moment = require("moment");
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
      expiresIn: "1h",
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

// User Profile Update
const updateUserProfileController = async (req, res) => {
  try {
    const doctor = await userModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res
      .status(201)
      .send({ success: true, message: `Profile Updated`, data: doctor });
  } catch (e) {
    res
      .status(500)
      .send({ success: false, message: `Profile is Unable To update`, e });
  }
};


const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seenNotification = user.seenNotification;
    const notification = user.notification;
    seenNotification.push(...notification);
    user.notification = [];
    user.seenNotification = notification;
    const updatedUser = await user.save();
    res.status(200).send({
      message: `All Notification marked as read`,
      success: true,
      data: updatedUser,
    });
  } catch (e) {
    res
      .status(500)
      .send({ message: "Error in Notification", success: false, e });
  }
};

// Delete All Notificatins
const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seenNotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      message: `Notification Delete Successfully`,
      success: true,
      data: updatedUser,
    });
  } catch (e) {
    res.status(500).send({ message: `Unable To delete`, success: false, e });
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    const doctor = await doctorModel.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: `Doctor Data Fetch Success`,
      data: doctor,
    });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ success: false, message: `Doctor data Fetching Failed `, e });
  }
};

const bookAppointmentController = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: `New Appointment Requested`,
      message: `A new Appointment Request From ${req.body.userInfo.name}`,
      onClickPath: "/user/appointment",
    });
    await user.save();
    res
      .status(200)
      .send({ success: true, message: `Appointment Booked Successfull` });
  } catch (e) {
    res.status(500).send({
      success: false,
      e,
      message: `Error In Booking Appointment System`,
    });
  }
};

const checkSlotsAvailabilityController = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: { $gte: fromTime, $lte: toTime },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        success: true,
        message: `Appointments Not Available at this time`,
      });
    } else {
      return res
        .status(200)
        .send({ success: true, message: `Appointments Available` });
    }
  } catch (e) {
    res
      .status(500)
      .send({ success: false, e, message: `Error In Check Status` });
  }
};

const userAppointmentsController = async (req, res) => {
  try {
    const docAppointment = await appointmentModel.find({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: `User Appointment Fetch Success`,
      data: docAppointment,
    });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ success: false, message: `Error In User Appointments`, e });
  }
};
module.exports = {
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
  updateUserProfileController
};
