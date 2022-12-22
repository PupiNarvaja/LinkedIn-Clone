const { verifyToken } = require("../auth/jwt");
const logger = require("../log");

module.exports = (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies.token) {
    if (req.session) {
      console.log("session destroyed.")
      req.session.destroy();
    }

    logger.error("There is no token!");
    return res.redirect("/login");
  }

  const token = cookies.token;

  if (!verifyToken(token)) {
    return res.redirect("/login");
  }
  logger.info("Valid token!");

  next();
};
