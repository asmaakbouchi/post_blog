const express = require("express");
const router = express.Router();
const controller = require("../Controllers/postControllers");
const authMiddleware = require("../middleware/authentification");
const log_date = require('../middleware/logmiddleware');
const isCreator = require("../middleware/auth&admin");
const isAdmin = require("../middleware/accessAdmin");
const upload = require('../utils/coudinary');

router.use(log_date);   

router.get("/", controller.getAllPosts);
router.get("/:id", controller.getPostById);

router.post("/", upload.single('image'),authMiddleware, controller.createPost);

router.put("/:id",upload.single('image'), authMiddleware, isCreator, controller.updatePost);
router.delete("/:id", authMiddleware, isCreator, controller.deletePostById);

router.use((err, req, res, next) => {
    res.status(500).send(err.message);
});

module.exports = router;
