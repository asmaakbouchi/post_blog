const fs = require('fs');
const Data = require("./posts.json");

const get_AllPosts=()=>{
    return Data.posts // pour acceder directement a posts qui est dans un objet {}
}

const posts=get_AllPosts(); // variable global qui contien tous les posts pour l'utilisé dans les methodes de mise a jour


const get_PostById=(id)=>{
    return posts.find(p=>p.id===parseInt(id));
}

const create_Post=(post)=>{
    let idauto = 1;
    if (posts.length > 0) {
        idauto = posts[posts.length - 1].id + 1;
    }
    const newPost={
        id:idauto,
        titre:post.titre,
        auteur:post.auteur,
        date:post.date,
        contenu:post.contenu,
        tags:post.tags
    }
    posts.push(newPost);
    savedata(posts);
    return newPost;
}

const update_Post=(id,post)=>
{
    const postf=posts.find(p=>p.id==id);
    if(!postf){
       return null;
    }
    else{
    postf.titre=post.titre;
    postf.auteur=post.auteur;
    postf.contenu=post.contenu;
    postf.date=post.date;
    postf.tags=post.tags;
    savedata(posts);
    return postf
    }
}

const delete_PostById=(id)=>{
    const index=posts.findIndex(p=>p.id===parseInt(id));
    if(index!==-1){
       posts.splice([index],1); // suprimer l'indice trouver
       savedata(posts);
       return true
    }
    else{ return false;}
}



const savedata= async(data)=> {
    try{
      const posts= await data;
        fs.writeFileSync('./Models/posts.json', JSON.stringify({posts}, null, 2)); // on ajouter les accolades { } pour stocker la liste des poste dans un objet dans le fichier json avec le meme nom de objet posts
    }
    catch(err){
      console.log(err);
    }
  }  

module.exports={get_AllPosts,get_PostById,create_Post,update_Post,delete_PostById}