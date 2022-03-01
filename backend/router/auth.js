const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
require("../db/conn");
const User = require("../model/userSchema");

//registration route
router.post("/reg", async (req, res) => {
  const { name, email, password, username, gender, age, photo } = req.body;
  if (!name || !email || !password || !username || !gender || !age) {
    return res.status(422).json({
      error: "error  field not filled properly in registration page ",
    });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "email id is already exist" });
    }
    const userName_Exist = await User.findOne({ username: username });

    if (userName_Exist) {
      return res.status(422).json({ error: "Username is already exist" });
    }
    //for creating collection
    const user = new User({
      name,
      email,
      password,
      username,
      gender,
      age,
      photo,
    });
    await user.save();
    res.status(201).json({ message: "user register 👍successfull" });
    //set-prefernce here
  } catch (err) {
    console.log(err);
  }
});

//login route
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(422)
        .json({ error: "error  field not filled properly in login page " });
    }
    const userLogin = await User.findOne({ username: username });
    if (!userLogin || userLogin.password != password) {
      res.status(400).json({ error: "user error" });
    } else {
      const token = await userLogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      res.json({ message: "user login  👍successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
