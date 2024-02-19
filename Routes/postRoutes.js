const express=require("express");
const router=express.Router();
const controller=require("../Controllers/postControllers");


router.get("/",controller.getAllPosts)
router.post("/",controller.createPost)
router.get("/:id",controller.getPostById)
router.put("/:id",controller.updatePost)
router.delete("/:id",controller.deletePostById)



module.exports=router