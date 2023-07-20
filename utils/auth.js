const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports.auth = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders) {
    res.status(400).send("Unauthorized");
  }
  const token = authHeaders.split("Bearer ")[1];
  try {
    jwt.verify(token, process.env.SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ errors: [{ msg: error.message }] });
  }
};
