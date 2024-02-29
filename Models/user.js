const Data = require("./users.json");
const fs=require('fs');
const bcrypt = require("bcrypt");

const savedata=async(data)=>{
const users=await data;
fs.writeFileSync("./Models/users.json",JSON.stringify({users},null,2));
}

const get_AllUsers=()=>{
    return Data.users 
}

const users= get_AllUsers();

const findUser=(data)=>{
    const {username,password}=data
    const user=users.find(u=>u.username===username)
    if(!user)return 0
    const pass =  bcrypt.compare(password, user.password);
    if (!pass)return 1 
    return user;
}

const register =(data)=>
{
    let idauto=1;
    if(users.length>0){ idauto = users[users.length-1].id+1}
    const {username,password,email,age}=data;
    bcrypt.hash(password,10,(err,hash)=>{
        if(err){console.log("Erreur hash :",err)}
    const newuser={
        id:idauto,
        username:username,
        password:hash,
        email:email,
        age:age
    }
    users.push(newuser); 
     })
    savedata(users);

   
}

module.exports={get_AllUsers,findUser,register}