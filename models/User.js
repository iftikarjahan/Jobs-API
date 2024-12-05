const { required } = require("joi");
const mongoose = require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email"
    ],
    unique:true    //ensures that no two documents have the same email
  },
  password:{
    type:String,
    required:[true,"Please provide a password"],
    minLength:3
  }
});


/*
PRE MIDDLEWARE
  ->This is the pre middleware that executes before the hook(here the save hook) occurs
  ->Hook here means this middleware would be executed before the document is saved to the db
  ->this keyword refers to the document
  -> use the function syntax because arrow functions does not have their own this keyword
*/ 
userSchema.pre("save",async function(){
  console.log("BEFORE THE SAVE OPERATION");
  
  const salt=await bcrypt.genSalt(10);
  const hashedPassword=await bcrypt.hash(this.password,salt);
  this.password=hashedPassword;

})

userSchema.methods.createJWTToken= function(){
  return jwt.sign({userId:this._id,userName:this.name},"mySecretKey",{expiresIn:"30d"});
}

// create a model from the schema
module.exports=mongoose.model("User",userSchema);
