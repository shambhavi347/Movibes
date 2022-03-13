const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

require("../db/conn");

const User = require("../model/userSchema");
const Preference = require("../model/preferenceSchema");
const Friend = require("../model/friendSchema");
const Conversation = require("../model/conversationSchema");
const Message = require("../model/message");

var id = 0;
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
    // for creating collection
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

    id = user._id;

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
router.get("/get-friends", authenticate, (req, res) => {
  console.log("hello friend page");

  var friendID = [];
  Friend.find({
    $and: [
      {
        id_user: req.rootUser._id,
      },
      {
        status: "accepted",
      },
    ],
  })
    .then((data) => {
      console.log("Friends found ");

      data.map((d, k) => {
        friendID.push(d.id_friend);
      });

      User.find({ _id: { $in: friendID } })
        .then((data) => {
          res.send(data);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

// //chat
router.post("/conversation", authenticate, async (req, res) => {
  let senderID = req.body.senderID;
  let receiverID = req.body.receiverID;
  const exist = await Conversation.findOne({
    members: { $all: [receiverID, senderID] },
  });

  if (exist) {
    res.status(200).json("conversation already exists");
    return;
  }
  const newConversation = new Conversation({
    members: [senderID, receiverID],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(422).json(error);
  }
});

//get conv
router.get("/conversation", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      memebers: { $in: [req.rootUser._id] },
    });
    res.json(conversation);
  } catch (error) {
    res.status(500).json(err);
  }
});

//add messages
router.post("/messages", authenticate, async (req, res) => {
  const newMsg = new Message(req.body);
  try {
    const savedMsg = await newMsg.save();
    res.status(200).json(savedMsg);
  } catch (error) {
    res.status(500).json(err);
  }
});
router.get("/messages/:conversationId", authenticate, async (req, res) => {
  console.log(req.params.conversationId);
  try {
    const messages = await Message.find({
      $or: [
        {
          $and: [
            { conversationId: req.params.conversationId },
            { senderId: req.rootUser._id },
          ],
        },
        {
          $and: [
            { sender: req.params.conversationId },
            { conversationId: req.rootUser._id },
          ],
        },
      ],
    });
    console.log(messages);
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

//logout page
router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User logout");
});

module.exports = router;
