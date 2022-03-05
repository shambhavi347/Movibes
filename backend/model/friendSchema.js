const mongoose = require("mongoose");
const User = require("../model/userSchema");
const Preference = require("../model/preferenceSchema");

const friendSchema = new mongoose.Schema({
  id_user: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  id_friend:{
    type:  mongoose.Schema.Types.ObjectId,
    ref: "Preference",
    }
    
});

const Friend = mongoose.model("FRIEND", friendSchema);

module.exports = Friend;
