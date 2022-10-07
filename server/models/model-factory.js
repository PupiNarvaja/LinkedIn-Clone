const userModel = require("./user-model");
const logger = require("../log");

class ModelFactory {
  static getModel(modelName) {
    switch (modelName) {
      case "user":
        return userModel;
      default:
        logger.error("Model does not exist.");
        throw new Error("Model does not exist.");
    }
  }
}

module.exports = ModelFactory;
