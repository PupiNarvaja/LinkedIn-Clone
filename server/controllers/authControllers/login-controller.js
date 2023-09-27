const logger = require("../../log");

const sendError = (req, res) => {
  const messages = req.session.messages;
  const lastMessage = messages[messages.length - 1];

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

// Asegurarse de que esta funcion sirva y no pueda ser eliminada, siendo un catch en donde se le envia el error al cliente.