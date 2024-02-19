const express=require("express");
const router=express.Router();
const controller=require("../Controllers/postControllers");

app.use((req,res,next)=>{
    const date=new Date();
    let msg=`[${date.toISOString()}] ${req.method} ${req.url}`;
    console.log(msg);
    next();
})

//Middleware pour error invalide format json
app.use((err,req,res,next)=>{
    if(err.status===400){
      return res.status(400).send("le syntax de json invalide")
    }
})

router.get("/",controller.getAllPosts)
router.post("/",controller.createPost)
router.get("/:id",controller.getPostById)
router.put("/:id",controller.updatePost)
router.delete("/:id",controller.deletePostById)

app.use((err, req, res, next) => {
    if (err.status == 500) {
         res.status(500).send('erreur dans le serveur');
     }
 });
 
module.exports=router