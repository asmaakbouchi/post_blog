

const Post = require("../Models/poste");
const isCreator=async(req,res,next)=>{
const id=req.params.id;

try{
    const post=await Post.findById(id) 
    if(!post){res.status(404).json({message:"le post n'existe pas"})}
    if(req.data.role==="admin" || req.data._id == post.auteur)
    { return next();  }
    else{res.status(403).json({message:"Accées limité"})}
    console.log(`id1 : ${id} \n id2: ${post.auteur}`)
}
catch(err){
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
}
}
module.exports=isCreator