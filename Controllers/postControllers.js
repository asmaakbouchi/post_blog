const model=require("../Models/poste")

const getAllPosts=(req,res)=>{
    const post=model.get_AllPosts();
    res.json(post);
}

const getPostById=(req,res)=>{
    const post=model.get_PostById(req.params.id);
    if(post){
        res.json(post)
    }
    else{
        res.json("le posts n'existe pas");
    }
}

const createPost=(req,res)=>{
const body=req.body;
model.create_Post(body);
res.send('Le poste est ajouter avec succes');
}

const updatePost=(req,res)=>{
    const id=req.params.id;
    const body=req.body;
    const post=model.update_Post(id,body)
    if(post){
      res.json(post);
    }
    else{ res.send(`le Post n'existe pas avec L'id ${id}`);}
  
}

const deletePostById = (req, res) => {
  const id=req.params.id;
  const exist=model.delete_PostById(id);
  if(exist){
    res.send(`Le poste de l'id ${id} est supprimé avec succée`);
  }
  else{
    res.send(`le Post n'existe pas avec l'id ${id}`);
  }  
};

module.exports={getAllPosts,getPostById,createPost,updatePost,deletePostById}