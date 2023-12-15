const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    let token = req.headers.authorization;
    
    console.log(token, ">> token dr authen");
    if (!token) {
      console.log(">> ini 1");
      throw { name: "InvalidToken" };
    }
    console.log(token, ">> token");
    if (token.slice(0, 7) !== "Bearer ") {
      console.log("masuk2");
      throw { name: "InvalidToken" };
    }

    token = token.slice(7);
    let payload = verifyToken(token);

    let user = await User.findByPk(payload.id);
    console.log(payload, ">> user");
    
    if (!user) {
      console.log("masuk3");

      throw { name: "InvalidToken" };
    }

    req.user = {
      id: user.id,
    };

    next();
  } catch (error) {
    console.log(error);
    if (error.name === "InvalidToken" || error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(500).json(error);
  }
}

module.exports = authentication;
