const express=require("express");
const app=express();
const port=3000

app.use(express.json());



const routerpost=require("./Routes/postRoutes");
app.use("/posts",routerpost);


// middleware gestion des erreur 
app.use((req, res) => {
    res.status(404).send(`La page n'existe pas`);
});

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