const { model } = require("mongoose");

class BaseModel {
  constructor(schema, modelName) {
    this.model = model(modelName, schema);
  }

  async getById(id) {
    return await this.model.findById(id);
  }
}

module.exports = BaseModel;
