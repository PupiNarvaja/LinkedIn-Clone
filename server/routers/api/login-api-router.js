const router = require("express").Router();
const PassportController = require("../../controllers/authControllers/passport-controller");
const loginController = require("../../controllers/authControllers/login-controller");
const UniversalController = require("../../controllers/universal-controller");

// "/login"
router.get("/", UniversalController.sendIndex);

router.get("/error", loginController.sendError);

router.post("/", PassportController.login);

module.exports = router;
