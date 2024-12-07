const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const registerController = async (req, res, next) => {
  const createdUser = await User.create({ ...req.body }); //this is the document instance that has been created
  /*
    ->Note an important thing that we should not send the user credentials as a response to
    the client. Instead send a jwt token
    ->The jwt token is generated in the UserSchema mehods 
    */

  // using the above document instance, I can call the schema methods
  const token = createdUser.createJWTToken();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: createdUser.name }, token });
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide both email and password🥲");
  }
  /*
->Now lets check if the email and password is present in the db or not
*/
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError(
      "User not found🥶. Please enter valid credentials"
    );
  }
  //   If the user exists, then check if password is correct or not
  const passwordIsMatched = await user.checkPassword(password);
  if (passwordIsMatched) {
    // If you get an user and password is matched, then create a jwt token and send it to the client
    const token = user.createJWTToken();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
  } else {
    throw new UnauthenticatedError(
      "User not found🥶. Please enter valid credentials"
    );
  }
};

module.exports = {
  registerController,
  loginController,
};
