const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const registerController = async (req, res, next) => {
  const createdUser = await User.create({ ...req.body }); //this is the document instance that has been created
  /*
    ->Note an important thing that we should not send the user credentials as a response to
    the client. Instead send a jwt token
    ->The jwt token is generated in the UserSchema mehods 
    */


    // using the above document instance, I can call the schema methods
    const token=createdUser.createJWTToken();
  res.status(StatusCodes.CREATED).json({user:{name:createdUser.name},token});
};

const loginController = (req, res, next) => {
  res.send("login user");
};

module.exports = {
  registerController,
  loginController,
};
