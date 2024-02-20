const router = require("express").Router();
const isAuthenticated = require("../../middlewares/isAuthenticated");
const UserController = require("../../controllers/user-controller");
const multerMiddleware = require("../../middlewares/multer");

// "/api/users"
router.use(isAuthenticated);

router.get("/", UserController.getUserInfo);

router.get("/all", UserController.getAllUsers);

router.get("/suggestion", UserController.getSuggestedUsers);

router.get("/:user", UserController.getUserByUrl);

router.post("/profilePicture", multerMiddleware, UserController.updateProfilePicture);

module.exports = router;
