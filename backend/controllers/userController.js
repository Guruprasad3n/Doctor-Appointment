const userModel = require("../models/userMode");
const bcrypt = require("bcryptjs");

// SIgnup
const registerController = async (req, res) => {
  //   const { name, email, password } = req.body;
  //   try {
  //     const existUser = await userModel.findOne({ email });
  //     if (existUser) {
  //       return res
  //         .status(200)
  //         .send({ message: `user Already Exist`, success: false });
  //     }
  //     //  const password = password
  //     const salt = await bcrypt.genSalt(10);
  //     const hashedPassword = await bcrypt.hash(password, salt);
  //     password = hashedPassword;
  //     const newUser = new userModel({ name, email, password });
  //     await newUser.save();
  //     return res
  //       .status(201)
  //       .send({ message: `Registration Success`, success: true });
  //   } catch (e) {
  //     res
  //       .status(500)
  //       .send({ success: false, message: `Something Wrong While Registration` });
  //   }
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

const loginController = () => {};

module.exports = { loginController, registerController };
