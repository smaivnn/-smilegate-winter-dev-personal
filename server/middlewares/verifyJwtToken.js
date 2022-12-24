const jwt = require("jsonwebtoken");

const verifyJwtToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(405);
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(406); //invalid token
    req.roles = decoded.roles;
    req._id = decoded._Id;
    next();
  });
};

module.exports = verifyJwtToken;
