const { Schema } = require("mongoose");
const multer = require("multer");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");
const BaseModel = require("./base-model");
const logger = require("../log/winston");

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
    const data = await this.model.find({}).lean();

    return data.map((user) => ({
      id: user._id.toString(),
      firstname: user.firstname,
      lastname:user.lastname,
      email: user.email,
      description: user.description,
      profile: user.profile,
      url: user.url,
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
      url: user.url,
    }));
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
    const user = await this.model.findOne({ email }).lean();
    
    if (!user) {
      return null;
    }
    
    return {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      name: `${user.firstname} ${user.lastname}`,
      email: user.email,
    };
  }

  async getUserByUrl(url) {
    const user = await this.model.findOne({ url }).lean();
    
    if (!user) {
      return null;
    }
    
    return {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      name: `${user.firstname} ${user.lastname}`,
      email: user.email,
      url: user.url,
    };
  }

  async isPasswordValid(email, password) {
    const user = await this.model.findOne({ email }).lean(); // Destructur password from the model and send directly to compare.

    return await bcrypt.compare(password, user.password);
  }

  async updateProfilePicture(req, res) {
    const MIMETYPES = ["image/jpeg", "image/pdf", "image/png"];

    const diskStorageConfig = {
      destination: (req, file, cb) => {
        cb(null, "../server/assets");
      },
      filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);
        cb(null, `${Date.now()}${fileExtension}`);
      },
    }

    const checkMimetypes = (req, file, cb) => {
      const type_is_allowed = MIMETYPES.includes(file.mimetype);

      if (type_is_allowed) {
        cb(null, true);
      } else {
        cb(new Error(`Only ${MIMETYPES.join("")} are allowed.`));
      }
    }
    
    const multerUpload = multer({
      storage: multer.diskStorage(diskStorageConfig),
      fileFilter: checkMimetypes(),
      limits: { fieldSize: 20000000 },
    });

    multerUpload.single("file")(req, res, async (err) => {
      if (err instanceof multer.MulterError || err) {
        logger.error(err);
        return res.sendStatus(500);
      }
      
      const defaultProfilePic = "/assets/defaultProfilePic.png";
      const userId = req.user.id;
      const identifier = { _id: userId };
      const property = { $set: { profile: `/assets/${req.file.filename}` } };

      const user = await this.findById(userId);
      const userProfilePath = user.profile;

      if (userProfilePath !== defaultProfilePic && fs.existsSync(`../server${userProfilePath}`)) {
        fs.unlinkSync(`../server${userProfilePath}`);
      }

      await this.model.findOneAndUpdate(identifier, property);
    });
  }

  async getPublicUserInfo(id) {
    const excludePassword = { password: 0 }
    const user = await this.model.findById(id, excludePassword);
      
    if (!user) {
      return null;
    }

    return user;
  }
}

module.exports = new UserModel();
