const mongoose =require("mongoose");
const usersSchema=({
    name:{type:String, required: true},
    password:{type:String, required: true}, 
    email:{type:String, required: true},
    age:{type:Number},
    createdAt:{type:Date},
    updatedAt:{type:Date}
}) 

const modeluser=mongoose.model("users",usersSchema);
module.exports=modeluser
