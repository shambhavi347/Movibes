//import express from 'express';

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");

const http = require("http");
const cookieparser = require("cookie-parser");

const app = express();

const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieparser());
dotenv.config({ path: "./config1.env" });

const PORT = process.env.PORT;

require("./db/conn");
app.use(express.json());
app.use(require("./router/auth"));
app.use(require("./router/user"));
app.use(require("./router/conversations"));

//  app.get('/',(req,res) =>{
//     res.send(`Hello guys`);
// });

app.get("/reg", (req, res) => {
  console.log(`hello registration page`);
  res.send(`hello about from the server`);
});

const rooms = {};

io.on("connection", (socket) => {
  socket.on("join room", (roomID) => {
    if (rooms[roomID]) {
      rooms[roomID].push(socket.id);
    } else {
      rooms[roomID] = [socket.id];
    }
    const otherUser = rooms[roomID].find((id) => id !== socket.id);
    if (otherUser) {
      socket.emit("other user", otherUser);
      socket.to(otherUser).emit("user joined", socket.id);
    }
  });

  socket.on("offer", (payload) => {
    io.to(payload.target).emit("offer", payload);
  });

  socket.on("answer", (payload) => {
    io.to(payload.target).emit("answer", payload);
  });

  socket.on("ice-candidate", (incoming) => {
    io.to(incoming.target).emit("ice-candidate", incoming.candidate);
  });
});

server.listen(PORT, () => {
  console.log(`server is running on port no. ${PORT}`);
});
