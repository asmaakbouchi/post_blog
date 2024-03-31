const express=require("express");
const router=express.Router();
const controller=require("../Controllers/postControllers");
const authMiddleware = require("../middleware/authentification");
const isCreator = require("../middleware/auth&admin");
const isAdmin = require("../middleware/accessAdmin");



router.use((req,res,next)=>{
    const date=new Date();
    let msg=`[${date.toISOString()}] ${req.method} ${req.url}`;
    console.log(msg);
    next();
})

router.get("/",controller.getAllPosts)
router.post("/",authMiddleware,controller.createPost)
router.get("/:id",authMiddleware,controller.getPostById)
router.put("/:id",authMiddleware,isCreator,controller.updatePost)
router.delete("/:id",authMiddleware,isCreator,controller.deletePostById)

router.use((err, req, res, next) => {
    res.status(500).send(err.message);
 }); 


module.exports=router 