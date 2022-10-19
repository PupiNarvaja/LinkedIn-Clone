const logger = require("../../log");

const sendError = async (req, res) => {
  const messages = req.session.messages
  const lastMessage = messages[messages.length - 1]

  try {
    res.status(401).send(lastMessage);
  } catch (error) {
    logger.error(error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  sendError,
};
