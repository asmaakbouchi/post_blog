const mongoose =require("mongoose");

const PostsSchema=({
    titre:{type:String, required: true},
    auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    contenu:{type:String},
    date:{type:Date},
    image:{type:String},
    updatedAt:{type:Date}
}) 

const modelpost=mongoose.model("posts",PostsSchema);
module.exports=modelpost

