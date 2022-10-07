const logger = require("../log/winston");

module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    logger.warn("User not authenticated by passport!")
    return res.redirect("/login");
  }

  next();
};
