// const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')   //the package for easily finding errors


const errorHandlerMiddleware = (err, req, res, next) => {

  let customError={
    // DEFAULT VALUE
    /*
    ->Note that this object is nothing very special.
    ->It just sets the basic values
    ->And we are doing this just to make the errors more understandable
    */ 
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong....Please try again later😶‍🌫️"
  }

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  if(err.code && err.code==11000){
    // modify the customError object
    customError.statusCode=StatusCodes.BAD_REQUEST;
    customError.message=`Duplicate value entered for ${Object.keys(err.keyValue)[0]} field, please choose another value`;
  }
  if(err.name==="ValidationError"){
    customError.statusCode=StatusCodes.BAD_REQUEST;
    customError.message=err.message;
  }
  if(err.name==="CastError"){
    customError.statusCode=StatusCodes.NOT_FOUND;
    customError.message=`No job found with id: ${err.value._id}`;
  }

  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json({msg: customError.message})
}

module.exports = errorHandlerMiddleware
