const userModel = require("../models/userMode");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

// Login
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
     return res.status(200).send({ message: "User Not Found", success: false });
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

module.exports = { loginController, registerController };
