//import express from 'express';

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express= require ('express');
const app= express();
 dotenv.config({path:'./config.env'});

const PORT=process.env.PORT;

require('./db/conn');
app.use(express.json());
app.use(require('./router/auth'));

const middleware= (req,res,next) =>{
    console.log(`Hello my middleware`);
    next();
};
//  app.get('/',(req,res) =>{
//     res.send(`Hello guys`);
// });

app.get('/reg',middleware,(req,res)=>{
    console.log(`hello registration page`);
    res.send(`hello about from the server`);
});
app.listen(PORT,() =>{
    console.log(`server is running on port no. ${PORT}`);
});
