// the app would perform basic CRUD functionality

// create
const createJobController=(req,res,next)=>{
    res.send("job created")
}

// read
const getAllJobsController=(req,res,next)=>{
    res.send("get all jobs")
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