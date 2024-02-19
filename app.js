const express=require("express");
const app=express();
const port=3000

app.use(express.json());

app.use((req,res,next)=>{
    const date=new Date();
    let msg=`[${date.toISOString()}] ${req.method} ${req.url}`;
    console.log(msg);
    next();
})

//Middleware pour error invalide format json
app.use((err,req,res,next)=>{
    if(err.status===400){
      return res.status(400).send("le syntax de json invalide")
    }
})

const routerpost=require("./Routes/postRoutes");
app.use("/posts",routerpost);

app.use((err, req, res, next) => {
    if (err.status == 500) {
         res.status(500).send('erreur dans le serveur');
     }
 });
 

app.listen(port,()=>
console.log(`Le serveur est executé dans le port ${port}`)
)