const { Schema, model } = require("mongoose");

const doctorSchema = new Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      require: [true, `First Name is Required`],
    },
    lastName: {
      type: String,
      require: [true, `Last Name is Required`],
    },
    phone: {
      type: String,
      require: [true, `Phone Number is Required`],
    },
    email: {
      type: String,
      require: [true, `Email is Required`],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      require: [true, `Address is Required`],
    },
    specilization: {
      type: String,
      require: [true, `Specilization is Required`],
    },
    experience: {
      type: String,
      require: [true, `Experience is Required`],
    },
    fee: {
      type: Number,
      require: [true, `Fee is Required`],
    },
    status: {
      type: String,
      default: "pending",
    },
    timings: {
      type: Object,
      require: [true, `Work Timing is Required`],
    },
  },
  {
    timestamps: true,
  }
);

const doctorModel = model("doctor", doctorSchema);
module.exports = doctorModel;
