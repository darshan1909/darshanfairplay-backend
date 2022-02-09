import mongoose from "mongoose";

var schema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  phone_no: {
    type: Number,
    required: true,
    min: 6000000000,
    max: 9999999999,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("login_details", schema);
// let login_details = module.exports = mongoose.model("login_details",schema);
