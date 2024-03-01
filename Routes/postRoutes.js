const express=require("express");
const router=express.Router();
const controller=require("../Controllers/postControllers");
const authMiddleware = require("../middleware/authentification");

router.use((req,res,next)=>{
    const date=new Date();
    let msg=`[${date.toISOString()}] ${req.method} ${req.url}`;
    console.log(msg);
    next();
})


router.get("/",authMiddleware,controller.getAllPosts)
router.post("/",authMiddleware,controller.createPost)
router.get("/:id",authMiddleware,controller.getPostById)
router.put("/:id",authMiddleware,controller.updatePost)
router.delete("/:id",authMiddleware,controller.deletePostById)


router.use((err, req, res, next) => {
    res.status(500).send(err.message);
 });

module.exports=router