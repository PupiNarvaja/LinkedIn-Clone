const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const logger = require("../log");

const generateToken = (user) => {
  const options = { expiresIn: "1800s" };
  
  try {
    return jwt.sign(user, JWT_SECRET, options);
  } catch (error) {
    logger.error(error?.message);
    return false;
  }
};

const verifyToken = (token) => {
  try {
    jwt.verify(token, JWT_SECRET); //Deberia mostrar en el front end. Recargar.
    return true;
  } catch (error) {
    logger.error(error?.message);
    return false;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
