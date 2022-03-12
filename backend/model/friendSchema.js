const mongoose = require("mongoose");
const User = require("../model/userSchema");
const Preference = require("../model/preferenceSchema");

const friendSchema = new mongoose.Schema({
  id_user: {
    type: String,
  },

  id_friend: {
    type: String,
  },
  status: {
    type: String,
    enum: ["accepted", "pending"],
  },
});

const Friend = mongoose.model("FRIEND", friendSchema);

module.exports = Friend;
