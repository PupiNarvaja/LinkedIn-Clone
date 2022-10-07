const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

module.exports = {
  generateToken: (user) => {
    return jwt.sign(user, JWT_SECRET, {
      expiresIn: "1800s",
    });
  },
  verifyToken: (token) => {
    try {
      jwt.verify(token, JWT_SECRET);
      return true;
    } catch (error) {
      return false;
    }
  },
};
