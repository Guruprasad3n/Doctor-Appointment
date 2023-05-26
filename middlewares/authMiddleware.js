const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(200).send({
          message: "Auth Failed",
          success: false,
        });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (e) {
    console.log(e);
    return res.status(401).send({
      message: "Auth Failed",
      success: false,
    });
  }
};
