const express=require("express");
const app=express();
const mongoose=require("mongoose");
require('dotenv').config();
const routerpost=require("./Routes/postRoutes");
const routeruser=require("./Routes/userRoutes");
const uri=process.env.uri
const port=process.env.port
mongoose.connect(uri).then(()=>console.log("Connecter database")).catch((err)=>console.log(err));

const cors=require('cors');
app.use(cors());

app.use(express.json());
app.use("/posts",routerpost);
app.use("/users",routeruser);
  
app.use((req, res) => {
    res.status(404).send(`La page n'existe pas`);
});

// middleware gestion des erreur
app.use((err, req, res, next) => {
    if (err.status === 400) {
        res.status(400).send("Le Syntaxe de fichier json incorrecte");
    } else {
        next(err);
    }
});


app.listen(port,()=>
console.log(`Le serveur est executé dans le port ${port}`)
)