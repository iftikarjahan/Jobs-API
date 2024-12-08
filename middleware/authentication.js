const UnauthenticatedError=require("../errors/unauthenticated")
const jwt=require("jsonwebtoken");
require("dotenv").config();

const authMiddleware=(req,res,next)=>{
    const authHeaders=req.headers.authorization;
    // console.log(authHeaders);
    
    if(!authHeaders){
        throw new UnauthenticatedError("Not allowed to access this route🤬🤬");
    }
    // extracting the token from the auth header
    const token=authHeaders.split(" ")[1];
    // console.log(token);
    
    try {
        //Extracting the data from the token
        const payload=jwt.verify(token,process.env.SECRET_KEY);
        console.log(payload);
        
        // attaching the data received from the payload to the request
        req.user={userId:payload.userId,userName:payload.userName}; //now the data can be used wherever the request is received
        next();
    } catch (error) {
        throw new UnauthenticatedError("Get Lost🤬🤬. Not allowed to access this route");
    }
}

module.exports=authMiddleware;