const express=require("express");
const app=express();
const port=3000

app.use(express.json());



const routerpost=require("./Routes/postRoutes");
app.use("/posts",routerpost);



app.listen(port,()=>
console.log(`Le serveur est executé dans le port ${port}`)
)