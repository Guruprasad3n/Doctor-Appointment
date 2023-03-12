const jwt = require("jsonwebtoken");

module.exports = async(req, res, next)=>{
    const token = req.headers['authorization'].split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, decode)=>{
        if(err){
            return res.status(200).send({message:`auth Failed`, success:false})
        }
        else{
            res.body.userId
        }
    })
}