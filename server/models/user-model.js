const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const fs = require("fs");
const BaseModel = require("./base-model");

class UserModel extends BaseModel {
  constructor() {
    const defaultProfilePic = "/assets/defaultProfilePic.png";

    const schema = new Schema({
      email: { type: String, required: [true, "No email provided."] },
      firstname: { type: String, required: [true, "No firstname provided."] },
      lastname: { type: String, required: [true, "No lastname provided."] },
      password: { type: String, required: [true, "No password provided."] },
      description: { type: String, required: [true, "No description provided."] },
      age: { type: Number, required: [true, "No age provided."] },
      address: { type: String, required: [true, "No address provided."] },
      phone: { type: Number, required: [true, "No phone provided."] },
      profile: { type: String, default: defaultProfilePic, required: [true, "No profile picture provided."] },
      url: { type: String, required: [true, "No URL provided."] },
      admin: { type: Boolean, default: false, required: [true, "Not allowed."] },
    });

    super(schema, "users");
  }

  async getAllUsers() {
    const DESIRED_FIELDS = "_id firstname lastname email description profile url";
    
    const users = await this.model
      .find()
      .select(DESIRED_FIELDS)
      .lean();

    return users;
  }

  async getSuggestedUsers(userId) {
    // All users except the one requesting the suggested users.
    // Future refactor: All users except the one requesting and those following already.
    // Considerar abstracción de DB, haciendo métodos de igual nombre y funcionalidad, para cada DB.
    // El usar find, select, limit, lean, hacen el programa más dependiente de la BD.
    // O retornar un objeto modificado con los fields obtenidos, o que se encarguen esos metodos abstractos.
    const query = { _id: { $ne: userId } };
    const limit = 3;
    const DESIRED_FIELDS = "_id firstname lastname description profile url";

    const users = await this.model
      .find(query)
      .select(DESIRED_FIELDS)
      .limit(limit)
      .lean();

    return users;
  }

  async saveUser(user) {
    user.password = await bcrypt.hash(user.password, 10);
    user.url = `${user.firstname}-${user.lastname}`;
    return await this.model.create(user);
  }

  async existsByEmail(email) {
    return await this.model.exists({ email });
  }

  async getUserByEmail(email) {
    const DESIRED_FIELDS = "_id firstname lastname email";
    const QUERY_ID = { email };

    const user = await this.model.findOne(QUERY_ID, DESIRED_FIELDS).lean();

    return user;
  }

  async getUserByUrl(url) {
    const DESIRED_FIELDS = "_id firstname lastname email url";
    const QUERY_ID = { url };

    const user = await this.model.findOne(QUERY_ID, DESIRED_FIELDS).lean();

    return user;
  }

  async isPasswordValid(email, password) {
    const DESIRED_FIELDS = "password";
    const QUERY_ID = { email };

    const { password: hashedPassword } = await this.model
      .findOne(QUERY_ID, DESIRED_FIELDS)
      .lean();

    return await bcrypt.compare(password, hashedPassword);
  }

  async updateProfilePicture(req) {
    const defaultProfilePic = "/assets/defaultProfilePic.png";
    const userId = req.user._id;
    const identifier = { _id: userId };
    const property = { $set: { profile: `/assets/${req.file.filename}` } };

    const user = await this.findById(userId);
    const userProfilePath = user.profile;

    if (userProfilePath !== defaultProfilePic && fs.existsSync(`../server${userProfilePath}`)) {
      fs.unlinkSync(`../server${userProfilePath}`);
    }

    return await this.model.findOneAndUpdate(identifier, property);
  }

  async getPublicUserInfo(id) {
    const EXCLUDED_FIELDS = "-password";
    const user = await this.model.findById(id, EXCLUDED_FIELDS).lean();

    return user;
  }
}

module.exports = new UserModel();

// Model should ask only for fileds of user we actually need. 
// El modelo deberia solicitar al DB solo los fields necesarios. Ya que si se hace abstracción de DB,
// debería existir un modelo que sin importar la DB utilizada, solicite a su manera, los fields solicistados en el model.