const multer = require("multer");
const path = require("path");
const logger = require("../log/winston");

const multerMiddleware = (req, res, next) => {
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
    const type_is_allowed = MIMETYPES.includes(file.mimetype || file.type);

    if (type_is_allowed) {
      cb(null, true);
    } else {
      cb(new Error(`Only ${MIMETYPES.join("")} are allowed.`));
    }
  }

  const multerUpload = multer({
    storage: multer.diskStorage(diskStorageConfig),
    fileFilter: checkMimetypes,
    limits: { fieldSize: 20000000 },
  });

  multerUpload.single("file")(req, res, (err) => {
    if (err instanceof multer.MulterError || err) {
      logger.error("Multer error. ", err);
      return res.status(500).send(err.message);
    }

    next();
  });
}

module.exports = multerMiddleware;