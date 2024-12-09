const Job=require("../models/Job");
const {StatusCodes}=require("http-status-codes");



// create
const createJobController=async (req,res,next)=>{
    const {userId,userName}=req.user;
    req.body.createdBy=userId;
    // now we need to create a job
    const newJob=await Job.create({...req.body});
    res.status(StatusCodes.CREATED).json(newJob);

}

// read
const getAllJobsController=async (req,res,next)=>{
    const jobs=await Job.find({createdBy:req.user.userId},null,{sort:{createdAt:1}});
    res.status(StatusCodes.OK).json({jobs,noOfJobs:jobs.length});
}

const getSingleJobController=(req,res,next)=>{
    res.send("get single job");
}

// update
const updateJobController=(req,res,next)=>{
    res.send("update job");
}

// delete
const deleteJobController=(req,res,next)=>{
    res.send("delete job")
}


module.exports={
    createJobController,
    getAllJobsController,
    getSingleJobController,
    updateJobController,
    deleteJobController
}