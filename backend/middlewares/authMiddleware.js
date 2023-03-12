const jwt = require("jsonwebtoken");

module.exports = async(req, res, next)=>{
    const token = req.headers['authorization'].split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET)
}