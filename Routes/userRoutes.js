const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userControllers");
const authMiddleware = require("../middleware/authentification");

router.use((req,res,next)=>{
    const date=new Date();
    let msg=`[${date.toISOString()}] ${req.method} ${req.url}`;
    console.log(msg);
    next();
})


 router.get("/", authMiddleware, userController.getAllUsers);

router.post("/login", userController.login);
router.post("/register", userController.register);

router.use((err, req, res, next) => {
    res.status(500).send(err.message);
 });
module.exports = router;
