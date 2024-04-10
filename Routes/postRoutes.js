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
router.post("/", upload.single('image'),authMiddleware, controller.createPost);
router.get("/:id", authMiddleware, controller.getPostById);
router.put("/:id", authMiddleware, isCreator, controller.updatePost);
router.delete("/:id", authMiddleware, isCreator, controller.deletePostById);

router.use((err, req, res, next) => {
    res.status(500).send(err.message);
});

module.exports = router;
