const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const BaseModel = require("./base-model");

class UserModel extends BaseModel {
  constructor() {
    const schema = new Schema({
      email: { type: String, required: true },
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      password: { type: String, required: true },
      description: { type: String, required: true },
      age: { type: Number, required: true },
      address: { type: String, required: true },
      phone: { type: Number, required: true },
      profile: { type: String, required: true },
      admin: { type: Boolean, default: false, required: true },
    });

    super(schema, "users");
  }

  async getAllUsers() {
    const data = await this.model.find({}).lean();

    return data.map((user) => ({
      id: user._id.toString(),
      firstname: user.firstname,
      lastname:user.lastname,
      email: user.email,
      description: user.description,
      profile: user.profile,
      // address: user.address,
    }));
  }

  async getSuggestedUsers(userId) {
    // All users except the one requesting the suggested users.
    // Future refactor: All users except the one requesting and those following already.
    const query = { _id: { $ne: userId } };
    const limit = 3;
    const data = await this.model.find(query).limit(limit).lean();

    return data.map((user) => ({
      id: user._id.toString(),
      firstname: user.firstname,
      lastname:user.lastname,
      email: user.email,
      description: user.description,
      profile: user.profile,
    }));
  }


  async saveUser(obj) {
    obj.password = await bcrypt.hash(obj.password, 10);
    return await this.model.create(obj);
  }

  async existsByEmail(email) {
    return await this.model.exists({ email });
  }

  async getUserByEmail(email) {
    const user = await this.model.findOne({ email }).lean(); // Desestructurar user: Razones de seguridad quizas.
    return {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      name: `${user.firstname} ${user.lastname}`,
      email: user.email,
    };
  }

  async isPasswordValid(email, password) {
    const user = await this.model.findOne({ email }).lean(); // Destructur password from the model and send directly to compare.

    return await bcrypt.compare(password, user.password);
  }
}

module.exports = new UserModel();
