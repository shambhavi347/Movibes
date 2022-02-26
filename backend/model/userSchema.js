const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const validator = require('validator');
const jwt= require('jsonwebtoken');

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
  photo:{
      type:String
    },
    tokens: [
        {
        token : {
           type:String,
           require:true
        }
    }
    ]    
})
//hashing password for secure
userSchema.pre('save', async function(next) {
    if(this.isModified('password')){
         this.password= await bcrypt.hash(this.password, 12);
    }
    next();
});


//generating token
userSchema.methods.generateAuthToken = async function() {
    try{
       let token = jwt.sign({_id : this._id},process.env.SECRET_KEY);      
      this.tokens = await this.tokens.concat({token:token});
      await this.save();
      return token;
    }catch(err)
    {
        console.log(err);
    }
}
const User = mongoose.model('USER',userSchema);

module.exports = User;