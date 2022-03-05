const mongoose = require("mongoose");
const validator = require("validator");
const User = require("../model/userSchema");

const preferenceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  drama: {
    type: Number,
    default: 0,
  },
  romance: {
    type: Number,
    default: 0,
  },
  action: {
    type: Number,
    default: 0,
  },
  thriller: {
    type: Number,
    default: 0,
  },
  mystery: {
    type: Number,
    default: 0,
  },
  comedy: {
    type: Number,
    default: 0,
  },
  musical: {
    type: Number,
    default: 0,
  },
  sci_fi: {
    type: Number,
    default: 0,
  },
  animation: {
    type: Number,
    default: 0,
  },
});

const Preference = mongoose.model("PREFERENCE", preferenceSchema);

module.exports = Preference;
