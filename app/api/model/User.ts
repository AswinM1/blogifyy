import mongoose  from "mongoose";
const userSchema =new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true
    }
})
const user = mongoose.models.User || mongoose.model("User", userSchema);

export default user