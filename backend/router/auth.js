const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
let p = require("python-shell");

require("../db/conn");
router.use(express.static("../front-end/src/"));
const User = require("../model/userSchema");
const Preference = require("../model/preferenceSchema");
const Friend = require("../model/friendSchema");
const Conversation = require("../model/conversationSchema");
const Message = require("../model/message");
const { json } = require("express");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../front-end/src/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const maxsize = 1 * 1024 * 1024; // 1 MB
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
    return sb(new Error("olny .jpg,  .png  and .jpeg format allowed "));
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: maxsize },
});
var id = 0;

//registration route
router.post("/reg", upload.single("photo"), async (req, res) => {
  // console.log("reg");
  const user1 = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    gender: req.body.gender,
    age: req.body.age,
    photo: req.file.originalname,
  });
  if (
    !user1.name ||
    !user1.email ||
    !user1.password ||
    !user1.username ||
    !user1.gender ||
    !user1.age
  ) {
    return res.status(422).json({
      error: "error  field not filled properly in registration page ",
    });
  }

  try {
    const userExist = await User.findOne({ email: user1.email });

    if (userExist) {
      return res.status(422).json({ error: "email id is already exist" });
    }
    const userName_Exist = await User.findOne({ username: user1.username });

    if (userName_Exist) {
      return res.status(422).json({ error: "Username is already exist" });
    }

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
  res.send(req.rootUser);
});

//get Friends
router.get("/get-friends", authenticate, (req, res) => {
  // console.log("hello friend page");

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
  // console.log(req.params.conversationId);
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
    // console.log(messages);
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Profile page

router.get("/profile", authenticate, (req, res) => {
  res.send(req.rootUser);
});

//update Profile
router.post("/update", authenticate, async (req, res) => {
  // console.log(req.rootUser._id);
  const user = await User.findById(req.rootUser._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.age = req.body.age || user.age;
    user.gender = req.body.gender || user.gender;
    const updatedUser = await user.save();
    console.log("update successfuly");

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
    });
  }
});

//logout page
router.get("/logout", authenticate, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((currtoken) => {
      return currtoken.token != req.token;
    });
    res.clearCookie("jwtoken");
    console.log("log out successfully");
    await req.rootUser.save();
    res.render("/");
  } catch (err) {
    res.status(500).send(err);
  }
});

//delete Profile

router.delete("/delete", authenticate, (req, res) => {
  try {
    // console.log(req.rootUser._id);
    const user = User.findByIdAndDelete(req.rootUser._id);
    const pref = Preference.findByIdAndDelete(req.rootUser._id);
    if (user && pref) {
      res.json({ message: "User Deleted Successfully....!" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ error: err.message || "Error while deleting User " });
  }
});

//get Friends Request
router.get("/get-requests", authenticate, (req, res) => {
  // console.log("hello friend request page");

  var friendID = [];
  Friend.find({
    $and: [
      {
        id_user: req.rootUser._id,
      },
      {
        status: "pending",
      },
    ],
  })
    .then((data) => {
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

//get users' pendind Request
router.get("/get-pending", authenticate, (req, res) => {
  // console.log("hello user's pending page");

  var friendID = [];
  Friend.find({
    $and: [
      {
        id_friend: req.rootUser._id,
      },
      {
        status: "pending",
      },
    ],
  })
    .then((data) => {
      data.map((d, k) => {
        friendID.push(d.id_user);
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

//accept friend request
router.post("/accept-frn", authenticate, async (req, res) => {
  let id_friend = req.body.friendID;

  await Friend.findOneAndUpdate(
    {
      $and: [
        {
          id_user: req.rootUser._id,
        },
        {
          id_friend: id_friend,
        },
      ],
    },
    { $set: { status: "accepted" } }
  );
});

//decline friend request
router.post("/reject-frn", authenticate, async (req, res) => {
  let id_friend = req.body.friendID;
  console.log(id_friend);
  // const data = await Friend.find({
  //   $and: [
  //     {
  //       $and: [
  //         {
  //           id_user: req.rootUser._id,
  //         },
  //         {
  //           id_friend: id_friend,
  //         },
  //       ],
  //     },
  //     {
  //       status: "pending",
  //     },
  //   ],
  // });
  // console.log(data);

  // await Friend.findOneAndDelete(
  //   {
  //     $and: [
  //       {
  //         $and: [
  //           {
  //             id_user: req.rootUser._id,
  //           },
  //           {
  //             id_friend: id_friend,
  //           },
  //         ],
  //       },
  //       {
  //         status: "pending",
  //       },
  //     ],
  //   },
  //   function (err, docs) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log("Deleted User : ", docs);
  //     }
  //   }
  // );
  await Friend.find(
    {
      id_user: req.rootUser._id,

      id_friend: id_friend,

      status: "pending",
    },

    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("Result :", result);
      }
    }
  ).remove();
});

//get suggested friends
router.get("/suggeted-frn", authenticate, async (req, res) => {
  const spawn = require("child_process").spawn;
  const data = JSON.stringify(req.rootUser._id);
  const userIDs = [];
  // const pythonProccess = spawn("python3", ["./main.py", req.rootUser._id]);
  var options = {
    args: [req.rootUser._id],
  };
  await p.PythonShell.run("./main.py", options, function (err, results) {
    console.log(results);
    res.send(results);
    // results.map((data, k) => {
    //   userIDs.push(data);
  });
  //   User.find({ _id: { $in: userIDs } })
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // });
});

module.exports = router;
