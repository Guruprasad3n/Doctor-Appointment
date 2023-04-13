const doctorModel = require("../models/doctorModel");

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
    res
      .status(500)
      .send({
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

module.exports = { getDoctorInfoController, updateProfileController };
