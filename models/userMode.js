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
  isAdmin:{
    type:Boolean,
    default:false
  },
  isDoctor:{
    type:Boolean,
    default:false
  },
  notification:{
    type:Array,
    default:[]
  },
  seenNotification:{
    type:Array,
    default:[]
  }
});

const userModel = model("user", userSchema);
module.exports = userModel;
