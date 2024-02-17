const { model } = require("mongoose");

class BaseModel {
  constructor(schema, modelName) {
    this.model = model(modelName, schema);
  }

  // Repetitivo. Mongoose ya tiene este metodo pero no funciona. Tiene que ver con el factory y como exporto los modelos.
  async findById(id) {
    return await this.model.findById(id);
  }

  async findOneAndUpdate(filter, update) {
    return await this.model.findOneAndUpdate(filter, update);
  }
}

module.exports = BaseModel;
