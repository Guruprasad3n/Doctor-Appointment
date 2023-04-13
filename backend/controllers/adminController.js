const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userMode");

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res
      .status(200)
      .send({
        message: `User Data Fetch Successful`,
        success: true,
        data: users,
      });
  } catch (e) {
    res
      .status(500)
      .send({ message: `Error While Fetching Users`, e, success: false });
  }
};

const getAllUDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res
      .status(200)
      .send({
        message: `Doctors Data Fetch Successful`,
        success: true,
        data: doctors,
      });
  } catch (e) {
    res
      .status(500)
      .send({
        message: `Error While Fetching Doctors Data`,
        success: false,
        e,
      });
  }
};
// Change Doctor Account Status

const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await userModel.findOne({ _id: doctor.userId });
    const notification = user.notification;
    notification.push({
      type: `doctor-account-request-updated`,
      message: `Your Doctor Account Request Has ${status}`,
      onClickPath: "/notification",
    });
    user.isDoctor = status === "approved" ? true : false;
    await user.save();
    res.status(201).send({ success: true, message: `Account Status Updated`, data: doctor });
  } catch (e) {
    res
      .status(500)
      .send({ success: false, message: `Erroe in Account Status`, e });
  }
};

module.exports = {
  getAllUsersController,
  getAllUDoctorsController,
  changeAccountStatusController,
};
