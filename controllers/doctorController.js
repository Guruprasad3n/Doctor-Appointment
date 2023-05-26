const appointmentModel = require("../models/appointmentModel");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userMode");

const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: `Doctor data fetch Successfull`,
      data: doctor,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      status: false,
      message: `Error while Fetching Doctor Ingormation`,
      e,
    });
  }
};
const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
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

const getDoctorByIdCOntorller = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: `Single Doctor Profile Fetching Success`,
      data: doctor,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      e,
      message: `Error In Fetching Single Doctor Profile`,
    });
  }
};

const doctorAppointmentController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const appointment = await appointmentModel.find({ doctorId: doctor._id });
    res.status(200).send({
      success: true,
      message: `Doctor Appointment Fetch Successfull`,
      data: appointment,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: `Error While Fetching Doctor Appointment`,
      e,
    });
  }
};

const updateStatusController = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointment = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointment.userId });
    const notification = user.notification
    notification.push({
      type: `status-updated`,
      message: `Your Appointment has been ${status}`,
      onClickPath: `/doctor-appointment`,
    });
    await user.save();
    res
      .status(200)
      .send({ success: true, message: `Appointment Status Updated` });
  } catch (e) {
    res
      .status(500)
      .send({
        success: false,
        e,
        message: `Error in Update Appointment Status`,
      });
  }
};
module.exports = {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdCOntorller,
  doctorAppointmentController,
  updateStatusController,
};
