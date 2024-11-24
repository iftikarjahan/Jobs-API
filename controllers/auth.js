const registerController=(req,res,next)=>{
    res.send("register user")
}

const loginController=(req,res,next)=>{
    res.send("login user");
}

module.exports={
    registerController,
    loginController
}