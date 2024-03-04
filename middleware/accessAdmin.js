const isAdmin=(req,res,next)=>{
try{
    if(req.data.role ==='admin'){
    return next();
    }
    else{
        return res.status(403).json({message: "Accées limité"})
    }
}
catch(err){
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
}
}

module.exports=isAdmin;