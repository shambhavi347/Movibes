//import express from 'express';

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cookieparser = require("cookie-parser");

const app = express();
app.use(cookieparser());
dotenv.config({ path: "./config1.env" });

const PORT = process.env.PORT;

require("./db/conn");
app.use(express.json());
app.use(require("./router/auth"));
app.use(require("./router/conversations"));
//  app.get('/',(req,res) =>{
//     res.send(`Hello guys`);
// });

app.get("/reg",  (req, res) => {
  console.log(`hello registration page`);
  res.send(`hello about from the server`);
});
app.listen(PORT, () => {
  console.log(`server is running on port no. ${PORT}`);
});
