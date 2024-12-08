const { ref } = require("joi");
const mongoose=require("mongoose");

const jobSchema=mongoose.Schema({
    company:{
        type:String,
        required:[true,"Please provide the company name"],
        maxlength:50
    },
    position:{
        type:String,
        required:[true,"Please provide the position"],
        maxlength:50
    },
    status:{
        type:String,
        enum:["interview","pending","declined"],
        default:"pending"
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:[true,"Please provide the user"]
    },
},{timestamps:true})

module.exports=mongoose.model("Job",jobSchema);