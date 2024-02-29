const mongoose =require("mongoose");
const PostsSchema=({
    titre:{type:String, required: true},
    auteur:{type:String}, 
    contenu:{type:String},
    date:{type:Date},
    tags:[{type:String}],
    updatedAt:{type:Date}
}) 

const modelpost=mongoose.model("posts",PostsSchema);
module.exports=modelpost

