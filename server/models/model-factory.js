const userModel = require("./user-model");
const postModel = require("./post-model");
const logger = require("../log");

class ModelFactory {
  static getModel(modelName) {
    switch (modelName) {
      case "user":
        return userModel;
      case "post":
        return postModel;
      default:
        logger.error(modelName, " does not exist.");
        throw new Error(modelName, " does not exist.");
    }
  }
}

module.exports = ModelFactory;
