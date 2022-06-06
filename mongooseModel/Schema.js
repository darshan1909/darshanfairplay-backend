import mongoose from "mongoose";

var schema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone_no: {
    type: Number,
    unique: true,
  },
  date: {
    type: Date,
  },
  gender: {
    type: String,
  },
  password: {
    type: String,
  },

});

export default mongoose.model("login_details", schema);
// let login_details = module.exports = mongoose.model("login_details",schema);
