const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    
    const headerval = req.headers["auth"];
    if (!headerval) {
        return res.status(401).json({ message: "token n'existe pas" });
    }
    try {
    const token =headerval.split(' ')[1];

    jwt.verify(token, "tokenkey",(err,data)=>{
        if(err){res.status(401).json(err.message)}
        req.data = data
    });
    
     
    next();
    } catch (error) {
        return res.status(401).json({ message: "token Invalid " });
    }
};

module.exports = auth;
