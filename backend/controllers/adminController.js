const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userMode");

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({message: `User Data Fetch Successful`,success: true,data: users,});
  } catch (e) {
    res.status(500).send({ message: `Error While Fetching Users`, e, success: false });
  }
};

const getAllUDoctorsController = async(req, res) => {
try{
const doctors = await doctorModel.find({})
res.status(200).send({message: `Doctors Data Fetch Successful`,success: true,data: doctors,});
}
catch(e){
    res.status(500).send({message:`Error While Fetching Doctors Data`, success:false, e})
}


};

module.exports = { getAllUsersController, getAllUDoctorsController };
