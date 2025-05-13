import mongoose from "mongoose";
const blogschema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    subtitle:
    {
        type:String,
        required:true
    },
    category:
    {
        type:String,
        required:true
    },

    content:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }


})
const blog=mongoose.models.Blog|| mongoose.model("Blog",blogschema)
export default blog