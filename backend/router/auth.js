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

//registration route
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../front-end/src/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  // fileFilter: fileFilter,
  // limits: { fileSize: maxsize },
});
var id = 0;

router.post("/reg", upload.single("photo"), async (req, res) => {
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
    !user1.age ||
    !user1.photo
  ) {
    return res.status(405).json({
      message: "field not filled properly in registration page ",
    });
  }
  try {
    const userExist = await User.findOne({ email: user1.email });
    if (userExist) {
      console.log("Exist email");
      return res.status(422).json({ message: "email id already exists" });
    }

    const userName_Exist = await User.findOne({ username: user1.username });
    if (userName_Exist) {
      console.log("Exist username");
      return res.status(422).json({ message: "Username already exists" });
    }
    await user1.save();

    id = user1._id;

    res.status(201).json({ message: "user register successfull ???????" });
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
        res.status(200).json({ message: "User login successfully ???????" });
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

//update prefernce
router.post("/update-preference", authenticate,async (req, res) => {
  try{
  console.log("Update Prefernce");
     var user_id=req.rootUser._id;
     var user1 = await Preference.findOne({ id_user: user_id});
     if(user1)
     {
       //drama updation
      if(req.body.drama==1 && user1.drama>=1)
      {
            user1.drama+=1;
      }
      else if(req.body.drama==1 && user1.drama==0)
      {
        user1.drama=req.body.drama;
      }
      else
      {
        user1.drama=user1.drama;
      }
      //romance updation
      if(req.body.romance==1 && user1.romance>=1)
      {
            user1.romance+=1;
      }
      else if(req.body.romance==1 && user1.romance==0)
      {
        user1.romance=req.body.romance;
      }
      else
      {
        user1.romance=user1.romance;
      }
      //action updataion
      if(req.body.action==1 && user1.action>=1)
      {
            user1.action+=1;
      }
      else if(req.body.action==1 && user1.action==0)
      {
        user1.action=req.body.action;
      }
      else
      {
        user1.action=user1.action;
      }
      //thriller updation
      if(req.body.thriller==1 && user1.thriller>=1)
      {
            user1.thriller+=1;
      }
      else if(req.body.thriller==1 && user1.thriller==0)
      {
        user1.thriller=req.body.thriller;
      }
      else
      {
        user1.thriller=user1.thriller;
      }
      //mystery updation
      if(req.body.mystery==1 && user1.mystery>=1)
      {
            user1.mystery+=1;
      }
      else if(req.body.mystery==1 && user1.mystery==0)
      {
        user1.mystery=req.body.mystery;
      }
      else
      {
        user1.mystery=user1.mystery;
      }
      //comedy updation
      if(req.body.comedy==1 && user1.comedy>=1)
      {
            user1.comedy+=1;
      }
      else if(req.body.comedy==1 && user1.comedy==0)
      {
        user1.comedy=req.body.comedy;
      }
      else
      {
         user1.comedy=user1.comedy;
      }
      //musical updation
      if(req.body.musical==1 && user1.muscial>=1)
      {
            user1.musical+=1;
      }
      else if(req.body.musical==1 && user1.musical==0)
      {
        user1.musical=req.body.musical;
      }
      else
      {
        user1.musical=user1.musical;
      }
      //sci_fi updation
      if(req.body.sci_fi==1 && user1.sci_fi>=1)
      {
            user1.sci_fi+=1;
      }
      else if(req.body.sci_fi==1 && user1.sci_fi==0)
      {
        user1.sci_fi=req.body.sci_fi;
      }  
      else
      {
        user1.sci_fi= user1.sci_fi;
      }
     //animated updation
      if(req.body.animated==1 && user1.animated>=1)
      {
            user1.animated+=1;
      }
      else if(req.body.animated==1 && user1.animated==0)
      {
        user1.animated=req.body.animated;
      }
     else
     {
      user1.animated=user1.animated;
     }
      await user1.save();
      console.log("update successfuly");
     res.status(201).json({ message: "Thankyou for your feedback!!" });
     }
     else
     {
      res.status(422).json({ error: "unauthorised person!!" });
     }
    }
     catch(err)
    {
      console.log(err);
    }

});

//home page
router.get("/home-page", authenticate, async (req, res) => {
  res.send(req.rootUser);
});

//get Friends
router.get("/get-friends", authenticate, (req, res) => {
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
      console.log("Friend: " + data);
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

//get friends
router.get("/get-friends1", authenticate, (req, res) => {
  var friendID = [];
  Friend.find({
    $and: [
      {
        id_friend: req.rootUser._id,
      },
      {
        status: "accepted",
      },
    ],
  })
    .then((data) => {
      console.log("Friend: " + data);
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
  // console.log("req.params"+req.params.conversationId);
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
let di = 0;
router.delete("/delete-user", authenticate, async (req, res) => {
  try {
    di = req.rootUser._id;
    // console.log(req.rootUser._id);
    const user = await User.findByIdAndDelete(req.rootUser._id);
    const data = await Preference.findOneAndRemove({
      id_user: di,
    });

    if (user && data) {
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

//get profile

router.post("/get-profile", authenticate, async (req, res) => {
  console.log("Hello Get PRofile");
  let id_friend = req.body.ID;
  console.log("Friend: " + id_friend);
  try {
    const data = await User.findById(id_friend);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

//cancel friend request

//decline friend request

router.post("/reject-frn", authenticate, async (req, res) => {
  let id_friend = req.body.friendID;
  console.log(id_friend);
  try {
    const deletefrnreq = await Friend.remove({
      id_user: req.rootUser._id,
      id_friend: id_friend,
      status: "pending",
    });
    if (deletefrnreq) {
      console.log("delete friend successfully");
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err);
  }
});

//delete friend
router.post("/delete-friend", authenticate, async (req, res) => {
  let id_friends = req.body.friendID;
  console.log("Delete: " + id_friends);
  try {
    const deletefrnreq = await Friend.deleteOne({
      $or: [
        {
          $and: [
            { id_user: req.rootUser._id },
            { id_friend: id_friends },
            { status: "accepted" },
          ],
        },
        {
          $and: [
            { id_user: id_friends },
            { id_friend: req.rootUser._id },
            { status: "accepted" },
          ],
        },
      ],
    });
    if (deletefrnreq) {
      console.log("delete friend successfully");
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log(err);
  }
});

//send friend Request
router.post("/accept-request", authenticate, async (req, res) => {
  let id_friend = req.rootUser._id;
  let id_user = req.body.ID;
  let status = "pending";
  console.log("Save: " + id_friend);
  try {
    const friend = new Friend({
      id_user,
      id_friend,
      status,
    });
    await friend.save();
    console.log("Saved Successfully");
  } catch (error) {
    console.log(err);
  }
});

//cancle request
//Cancel friends from friend table if (i don't want to send a friend request)
router.post("/cancel-frn", authenticate, async (req, res) => {
  let id_friend = req.body.friendID;
  console.log(id_friend);
  try {
    const deletefrnreq = await Friend.remove({
      id_user: id_friend,
      id_friend: req.rootUser._id,
      status: "pending",
    });
    if (deletefrnreq) {
      console.log("cancel friend request successfully");
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err);
  }
});

//get suggested friends
router.get("/suggeted-frn", authenticate, (req, res) => {
  console.log("hello suggested friends");
  // const spawn = require("child_process").spawn;
  // const data = JSON.stringify(req.rootUser._id);
  // const userIDs = [];
  // const pythonProccess = spawn("python3", ["./main.py", req.rootUser._id]);
  var options = {
    args: [req.rootUser._id],
  };
  p.PythonShell.run("./main.py", options, function (err, results) {
    console.log("Results: " + results);
    res.send(results);
  });
});

module.exports = router;
