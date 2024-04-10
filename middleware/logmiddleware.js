const logMiddleware = (req, res, next) => {
    const date = new Date();
    let msg = `[${date.toISOString()}] ${req.method} ${req.url}`;
    console.log(msg);
    next();
};

module.exports=logMiddleware