const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    require: [true, "Name is Require"],
  },
  email: {
    type: String,
    require: [true, "Email is Require"],
  },
  password: {
    type: String,
    require: [true, "Password Is Require"],
  },
});

const userModel = model("user", userSchema);
module.exports = userModel;
