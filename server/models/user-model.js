const { Schema } = require("mongoose");
const multer = require("multer");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");
const BaseModel = require("./base-model");

class UserModel extends BaseModel {
  constructor() {
    const defaultProfilePic = "/assets/defaultProfilePic.png";

    const schema = new Schema({
      email: { type: String, required: true },
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      password: { type: String, required: true },
      description: { type: String, required: true },
      age: { type: Number, required: true },
      address: { type: String, required: true },
      phone: { type: Number, required: true },
      profile: { type: String, default: defaultProfilePic, required: true },
      url: { type: String, required: true },
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
    const user = await this.model.findOne({ email }).lean(); // Desestructurar user: Razones de seguridad quizas.
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
      return null
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
    
    const multerUpload = multer({
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "../server/assets");
        },
        filename: (req, file, cb) => {
          const fileExtension = path.extname(file.originalname);
          //const FILENAME = file.originalname.split(fileExtension)[0];

          //cb(null, `${FILENAME}-${Date.now()}${fileExtension}`);
          cb(null, `${Date.now()}${fileExtension}`);
        }
      }),
      fileFilter: (req, file, cb) => {
        if (MIMETYPES.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error(`Solamente ${MIMETYPES.join("")} están permitidos.`));
        }
      },
      limits: { fieldSize: 25000000 }
    });

    multerUpload.single("file")(req, res, async (err) => {
      if (err instanceof multer.MulterError || err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        const defaultProfilePic = "/assets/defaultProfilePic.png";
        const userId = req.user.id;
        const identifier = { _id: userId };
        const property = { $set: { profile: `/assets/${req.file.filename}` } };

        // Eliminar la foto de perfil anterior
        const user = await this.getById(userId);
        const userProfilePath = user.profile;

        if (userProfilePath !== defaultProfilePic && fs.existsSync(`../server${userProfilePath}`)) {
          fs.unlinkSync(`../server${userProfilePath}`);
        }

        await this.model.findOneAndUpdate(identifier, property);
        console.log("Foto de perfil actualizada!");
      }
    });
  }
}

module.exports = new UserModel();
