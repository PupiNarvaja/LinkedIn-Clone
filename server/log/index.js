const logger = require("./winston");

module.exports = {
  log: (msg, level = "info") => logger.info(msg),
  warn: (msg) => logger.warn(msg),
  error: (msg, error) => logger.error(msg, error),
  info: (msg) => logger.info(msg),
};
