const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const headerval = req.headers["auth"];
    if (!headerval) {
        return res.status(401).json({ message: "Token n'existe pas" });
    }
    try {
        const token = headerval.split(' ')[1];
        jwt.verify(token, "tokenkey", (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Token invalide" });
            }
            req.user = decoded; // Set the decoded user data on req.user
            next();
        });
    } catch (error) {
        return res.status(401).json({ message: "Erreur lors de la validation du token" });
    }
};

module.exports = auth;
