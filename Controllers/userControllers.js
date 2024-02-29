const model = require("../Models/user");
const jwt = require("jsonwebtoken");

const getAllUsers = (req, res) => { 
    const users = model.get_AllUsers();
    res.send(`you are admin in email ${req.data.email} \n ths is list of users :`,users );   
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

module.exports = { getAllUsers, login, register}; 
