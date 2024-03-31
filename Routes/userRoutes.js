const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userControllers");
const authMiddleware = require("../middleware/authentification");
const isAdmin = require("../middleware/accessAdmin");


router.use((req,res,next)=>{
    const date=new Date();
    let msg=`[${date.toISOString()}] ${req.method} ${req.url}`;
    console.log(msg);
    next();
})

router.post("/add",isAdmin,userController.creatUser);
router.post("/login", userController.login);
router.post("/signup", userController.register);

router.get("/",userController.getAllUsers);
router.get("/profil",authMiddleware,userController.profil);
router.get("/:id",authMiddleware,userController.findUserid);

router.put("/:id",authMiddleware,isAdmin,userController.updateUser);
router.delete("/:id",authMiddleware,isAdmin,userController.deleteUser);


router.use((err, req, res, next) => {
    res.status(500).send(err.message);
 });

module.exports = router;