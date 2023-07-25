const router = require("express").Router();
const isAuthenticated = require("../../middlewares/isAuthenticated");
const UserController = require("../../controllers/user-controller");

// "/api/users"
router.use(isAuthenticated);

router.get("/", UserController.getUserInfo);

router.get("/all", UserController.getAllUsers);

router.get("/suggestion", UserController.getSuggestedUsers);

router.get("/:user", UserController.getUserByUrl);

router.post("/profilePicture", UserController.updateProfilePicture);

module.exports = router;
