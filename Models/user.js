const mongoose =require("mongoose");
const usersSchema=({
    name:{type:String, required: true},
    password:{type:String}, 
    email:{type:String},
    age:{type:Number},
    createdAt:{type:Date}
}) 

const modeluser=mongoose.model("users",usersSchema);
module.exports=modeluser
