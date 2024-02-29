const express=require("express");
const router=express.Router();
const controller=require("../Controllers/postControllers");

router.use((req,res,next)=>{
    const date=new Date();
    let msg=`[${date.toISOString()}] ${req.method} ${req.url}`;
    console.log(msg);
    next();
})


router.get("/",controller.getAllPosts)
router.post("/",controller.createPost)
router.get("/:id",controller.getPostById)
router.put("/:id",controller.updatePost)
router.delete("/:id",controller.deletePostById)


router.use((err, req, res, next) => {
    res.status(500).send(err.message);
 });

module.exports=router