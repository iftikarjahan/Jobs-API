const Job=require("../models/Job");
const {StatusCodes}=require("http-status-codes");
const {NotFoundError,BadRequestError}=require("../errors");



// create
const createJobController=async (req,res,next)=>{
    const {userId,userName}=req.user;
    req.body.createdBy=userId;
    req.body.createdByName=userName;
    // now we need to create a job
    const newJob=await Job.create({...req.body});
    res.status(StatusCodes.CREATED).json(newJob);

}

// read
const getAllJobsController=async (req,res,next)=>{
    const jobs=await Job.find({createdBy:req.user.userId},null,{sort:{createdAt:1}});
    res.status(StatusCodes.OK).json({jobs,noOfJobs:jobs.length});
}

const getSingleJobController=async (req,res,next)=>{
    
    // used js destructuring syntax
    const{user:{userId,userName},params:{id:jobId}}=req;
    // based on the jobId and userId, you need to find the corresponding job
    /*
    ->Note an important thing that ids in mongodb are unique. So even if we use only one 
    filter like jobId as the filter, then also we would get the job.
    ->But still we are using the createdBy as an extra filter. This is because of security 
    reasons
    ->If any other user gets a jobId created by some other user, then he can easily
    access that job even though he has not created the job.
    ->So by adding the extra createdBy filter, we ensure that the logged in user is 
    only allowed to access that job
    */ 
    const job=await Job.findById({_id:jobId,createdBy:userId});
    // console.log(job);
    if(!job){
        // console.log("lllllllll");
        throw new NotFoundError("Job with this id not found🥶");
    }
    res.status(StatusCodes.OK).json({job});
    
}

// update
const updateJobController=async (req,res,next)=>{
    const{body:{company,position},user:{userId,userName},params:{id:jobId}}=req;
    // check if the credentials were provided or not
    if(company==="" || position===""){
        throw new BadRequestError("Please provide both the credentials you want to update🐰");
    }
    const updatedJob=await Job.findByIdAndUpdate({_id:jobId,createdBy:userId},{company:company,position:position},{new:true,runValidators:true});
    if(!updatedJob){
        throw new NotFoundError("Unable to update the job, maybe not found the job🤔🤔");
    }
    
    res.status(StatusCodes.OK).json(updatedJob);
}

// delete
const deleteJobController=async (req,res,next)=>{
    
    const{user:{userId,userName},params:{id:jobId}}=req;
    const deletedJob=await Job.findByIdAndDelete({_id:jobId,createdBy:userId});
    console.log(deletedJob);
    
    if(!deletedJob){
        
        throw new NotFoundError(`No job found with the id: ${jobId}🥶`);
    }
    res.status(StatusCodes.OK).json({msg:"Job Deleted👻",deletedJob});
}

module.exports={
    createJobController,
    getAllJobsController,
    getSingleJobController,
    updateJobController,
    deleteJobController
}