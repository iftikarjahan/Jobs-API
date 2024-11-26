const express=require("express");
const router=express.Router();
const jobCotrollers=require("../controllers/jobs");

/*
->Note that both requests wont be executed at the same time.
->Seperate requests would be done using seperate buttons in the frontend or whatever interface you are 
using
*/ 
router.route("/").get(jobCotrollers.getAllJobsController).post(jobCotrollers.createJobController);
router.route("/:id").get(jobCotrollers.getSingleJobController).patch(jobCotrollers.updateJobController).delete(jobCotrollers.deleteJobController);

module.exports=router;