const {StatusCodes}=require("http-status-codes");
const User=require("../models/User");

const registerController=async(req,res,next)=>{
    
    const createdUser=await User.create({...req.body});
    res.status(StatusCodes.CREATED).json(createdUser);
}

const loginController=(req,res,next)=>{
    res.send("login user");
}

module.exports={
    registerController,
    loginController
}