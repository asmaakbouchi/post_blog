const modeluser = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt=require("bcrypt");

const profil=async(req,res)=>{
  const emailconnected=req.data.email;
  const user=await modeluser.findOne({email:emailconnected})
  const {email,age,name,createdAt}=user
  res.send(`Bienvenu ${name} dans votre espace utilisateur vous voila vos informtion : \n
  Nom:${name} \n Email: ${email} \n Age: ${age} \n Date creation du compte: ${createdAt}`)
}

const getAllUsers = async (req, res) => {
    try {
      const users = await modeluser.find();
      if (!users || users.length === 0) {
        return res.status(404).json({ message: "Aucun utilisateur trouvé" });
      }
      res.status(200).json(users);
      console.log('Email', req.data.email);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

const findUserid=async(req,res)=>{
const iduser=req.params.id;
const user=await modeluser.findById(iduser);
if(!user){ return res.status(404).json({message: "L'utilisateur n'existe pas"});}
res.status(200).json(user);
}

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await modeluser.findOne({ email: email });
      if (!user) {
        return res.status(404).send("L'email est incorrect");
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).send("Le mot de passe est incorrect");
      }
      const token = jwt.sign({ email: user.email }, "tokenkey", { expiresIn: "1h" });
      res.status(200).json({ message: `Bien connecté`, token });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

const register = async (req, res) => {
    try {
      const {name, password, email, age } = req.body;
      const hash = await bcrypt.hash(password, 10);
      const newuser = {
        name: name,
        password: hash,
        email: email,
        age: age,
        createdAt : Date.now()
      };
      const user = await modeluser.create(newuser);
      res.status(200).json({ message: "Inscription avec succès", user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const updateUser=async(req,res)=>{
    try{
      const {name, email, age } = req.body;
      const id=req.params.id;
      const newuser={
        name:name,email:email,age:age,updatedAt:Date.now()
      }
      const user=await modeluser.findByIdAndUpdate(id,newuser,{new:true})
      if(!user){
        res.status(404).json({message:`l'utilisateur avec l'id ${id} n'existe pas`});
      }
      res.status(200).json({message:" l'utilisateur est modifier avec succées", utilisateur : user})
    }
    catch(err){
      console.log(err);
      if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).json({ message: "Format d'ID invalide" });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  const deleteUser=async(req,res)=>{
    try{
      const id=req.params.id;
      const user= await modeluser.findByIdAndDelete(id)
      if(!user){
        res.status(404).json({message:`l'utilisateur avec l'id ${id} n'existe pas`});
      }
      res.status(200).json({message:" l'utilisateur est supprimé avec succées"})
    }
    catch(err){
      console.log(err);
      if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).json({ message: "Format d'ID invalide" });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  




/*
const getAllUsers = (req, res) => { 
    const users = model.find();
    res.json({message:`you are admin in email ${req.data.email} \n ths is list of users :`,user:users});   
}

const register=(req,res)=>{
    model.register(req.body);
    res.status(200).json(`ajouter avec succées `);
}

const login =(req, res) => {
    const user = model.findUser(req.body)
    if(user===0) return res.status(401).send("le nom d'utilisateur incorrect");
    if(user===1) return res.status(401).send("le mot de passe incorrect")
    console.log(user);

    const token = jwt.sign({email: user.email }, "tokenkey", { expiresIn: "1h" });

    res.status(200).json({ message: "Bien connecté", token });
    
}
*/

module.exports = { getAllUsers, login, register,findUserid,profil,updateUser,deleteUser}; 
