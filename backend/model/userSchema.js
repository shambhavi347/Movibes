const mongoose = require('mongoose');
const validator = require('validator');
const multer= require('multer');

const userSchema = new mongoose.Schema({
     name:{
         type:String,
         require:true
     },
     email:{
         type:String,
         unique:true,
         require:true,
         validator(value){
             if(!validator.isEmail(value)){
                 throw new Error("email is invalid "); 
             }
         }
     },
     password:{
         type:String,
        require:true
     },
     username:{
         type:String,
         require:true,
         unique:true
     },
     gender:{
        type:String,
        enum:["male","female","others"],
        require:true 
    },
    age:{
        type:Number,
        require:true
    },
   /* image:
    {
        data: Buffer,
        contentType: String
    }*/    
})

const User = mongoose.model('USER',userSchema);

module.exports = User;