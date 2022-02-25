const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt=require("bcryptjs");
const router = express.Router();
const multer= require('multer');
const bodyParser = require('body-parser');
require("../db/conn");
const User = require("../model/userSchema");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
      cb(null, Date.now()+'_'+ file.originalname)
  }
});
var upload = multer({ storage: storage });
//registration route
router.post("/reg",upload.single('photo'), async (req, res) => {

  const { name, email, password, username, gender, age,photo } = req.body;
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
    const user = new User({ name, email, password, username, gender, age, photo });
    
    await user.save();
    res.status(201).json({ message: "user register 👍successfull" });
  } catch (err) {
    console.log(err);
  }
});

//login route
router.post("/", async (req, res) => {
  try {
    let token;
    const { username, password } = req.body;

    if (!username || !password) {

      return res.status(422).json({ error: "error  field not filled properly in login page " });
    }

    const userLogin = await User.findOne({ username: username });
    
        if(userLogin)
        {
          const isMatch = await bcrypt.compare(password, userLogin.password);
           token = await userLogin.generateAuthToken();
        res.cookie("jwtoken", token, {
         expires: new Date(Date.now() + 25892000000),//25892000000milisecond=30 days
          httpOnly: true,
         });
         
        if (!isMatch) {
          res.status(400).json({ error: "invalid credentials" });
        } else {
         
          res.json({ message: "user login  👍successfully" });
        }
      }
        else
        {
       res.status(400).json({ error: "invalid credentials" });
     } 
 
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
