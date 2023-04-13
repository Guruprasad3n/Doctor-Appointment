const doctorModel = require("../models/doctorModel");

const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res
      .status(200)
      .send({
        success: true,
        message: `Doctor data fetch Successfull`,
        data: doctor,
      });
  } catch (e) {
    console.log(e)
    res.status(500).send({status: false,message: `Error while Fetching Doctor Ingormation`, e
      });
  }
};
module.exports = { getDoctorInfoController };
