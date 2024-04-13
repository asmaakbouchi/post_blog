const model = require("../Models/poste");


const getAllPosts = async (req, res) => {
  try {
    const posts = await model.find();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPostById = async (req, res) => { 
  try {
    const postId = req.params.id;
    const post = await model.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Le post n'existe pas" });
    }
    res.json(post);
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      return res.status(400).json({ message: "Format d'ID invalide" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createPost = async (req, res) => {
  try {
    const idauteur = req.user._id; 
    const img=req.file.path
    const newPost = {
      titre: req.body.titre,
      date: Date.now(),
      auteur: idauteur,
      image:img,
      contenu: req.body.contenu,
    };
    await model.create(newPost);
    res.status(201).json({ message: "Le post est ajouté avec succès" });
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      return res.status(400).json({ message: "Format d'ID invalide" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updatePost = async (req, res) => {
  try {
    const idPost = req.params.id;
    const img = req.file ? req.file.path : null; // Check if an image is provided
    const { titre, contenu } = req.body; // Extract fields from req.body

    const updatedFields = {
      titre,
      contenu,
      updatedAt: Date.now(),
    };

    if (img) {
      updatedFields.image = img;
    }

    const updatedPost = await model.findByIdAndUpdate(
      idPost,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post n'existe pas" });
    }

    res.status(200).json({ message: "Post modifié avec succès", post: updatedPost });
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      return res.status(400).json({ message: "Format d'ID invalide" });
    }
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};


const deletePostById = async (req, res) => {
  try {
    const idPost = req.params.id;
    const result = await model.deleteOne({ _id: idPost });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Post n'existe pas " });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      return res.status(400).json({ message: "Format d'ID invalide" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePostById,
};
