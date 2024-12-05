const {StatusCodes}=require("http-status-codes");
const User=require("../models/User");
const bcrypt=require("bcryptjs");

const registerController=async(req,res,next)=>{
    let {name,email,password}=req.body;
    
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    console.log(hashedPassword);

    const modifiedUserObject={name,email,password:hashedPassword};
    console.log(modifiedUserObject);
    
    
    const createdUser=await User.create({...modifiedUserObject});
    res.status(StatusCodes.CREATED).json(createdUser);
}

const loginController=(req,res,next)=>{
    res.send("login user");
}

module.exports={
    registerController,
    loginController
}