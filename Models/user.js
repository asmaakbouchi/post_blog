const mongoose =require("mongoose");
const usersSchema=({
    name:{type:String, required: true},
    password:{type:String, required: true}, 
    email:{type:String, required: true, unique:true},
    createdAt:{type:Date},
    updatedAt:{type:Date},
    role:{type:String ,required:true, enum:['admin','user']}
}) 
const modeluser=mongoose.model("users",usersSchema);
module.exports=modeluser
