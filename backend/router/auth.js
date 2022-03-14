const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

require("../db/conn");

const User = require("../model/userSchema");
const Preference = require("../model/preferenceSchema");
const Friend = require("../model/friendSchema");

const storage = multer.diskStorage({
  destination: function(req,file,cb) {
      cb(null, 'D:/MCA/MOVIBES-1/front-end/uploads/');
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});
;

const upload =  multer({storage: storage});

var id = 0;
//registration route
router.post("/reg", upload.single('photo'), async (req, res) => {
 
  const user1= new User( { 
    name:req.body.name,
    email: req.body.email,
    password: req.body.password, 
    username: req.body.username,
    gender: req.body.gender,
    age: req.body.age,
    photo: req.file.originalname,
  }) ;
  if (!user1.name || !user1.email || !user1.password || !user1.username || !user1.gender || !user1.age) {
    return res.status(422).json({
      error: "error  field not filled properly in registration page ",
    });
  }

  try {
    const userExist = await User.findOne({ email:user1.email });

    if (userExist) {
      return res.status(422).json({ error: "email id is already exist" });
    }
    const userName_Exist = await User.findOne({ username: user1.username });

    if (userName_Exist) {
      return res.status(422).json({ error: "Username is already exist" });
    }
    // for creating collection
    // const user = new User({
    //   name: req.body.name,
    //   email: ,
    //   password,
    //   username,
    //   gender,
    //   age,
    //   photo,
    // });

    await user1.save();

    id = user1._id;

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
      return res
        .status(400)
        .json({ error: "Field not filled properly in login page " });
    }
    const userLogin = await User.findOne({ username: username });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      token = await userLogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (!isMatch) {
        res.status(400).json({ error: "Incorrect Password" });
      } else {
        res.status(200).json({ message: "User login  👍successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credientials" });
    }
  } catch (err) {
    console.log(err);
  }
});
//set preference route

router.post("/set-preference", async (req, res) => {
  const {
    drama,
    romance,
    action,
    thriller,
    sci_fi,
    comedy,
    musical,
    animated,
    mystery,
  } = req.body;
  var count = 0;
  if (drama == 1) {
    count++;
  }
  if (romance == 1) {
    count++;
  }
  if (action == 1) {
    count++;
  }
  if (thriller == 1) {
    count++;
  }
  if (sci_fi == 1) {
    count++;
  }
  if (comedy == 1) {
    count++;
  }
  if (musical == 1) {
    count++;
  }
  if (animated == 1) {
    count++;
  }
  if (mystery == 1) {
    count++;
  }
  if (id == 0) {
    return res.status(422).json({ message: "unauthorized person" });
  }
  if (count < 5) {
    return res.status(422).json({ message: "select minimum five genre" });
  }
  try {
    //for creating collection
    const preference = new Preference({
      id_user: id,
      drama,
      romance,
      action,
      thriller,
      sci_fi,
      comedy,
      musical,
      animated,
      mystery,
    });
    await preference.save();
    id = 0;
    res.status(201).json({ message: "preference saved successfully!" });
  } catch (err) {
    console.log(err);
  }
});

//home page
router.get("/home-page", authenticate, async (req, res) => {
  console.log("hello home page");
  console.log(req.rootUser._id);
  res.send(req.rootUser);
});

//get Friends
router.get("/get-friends", authenticate, async (req, res) => {
  console.log("hello friend page");

  const friends = await Friend.find({
    $and: [
      {
        id_user: req.rootUser._id,
      },
      {
        status: "accepted",
      },
    ],
  });
  friends.map((friend) => console.log(friend.id_friend));
  console.log(friends);
  res.send(friends);
});

//Profile page

router.get("/profile",authenticate, (req,res) =>{
    res.send(req.rootUser);
});

//logout page
router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User logout");
});

module.exports = router;
