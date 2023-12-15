const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

// console.log(SECRET, ">> ini ada di jwt");

const signToken = (payload) => {
  return jwt.sign(payload, SECRET);
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};

module.exports = {
  signToken,
  verifyToken,
};
