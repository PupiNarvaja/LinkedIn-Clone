const router = require("express").Router();
const PassportController = require("../../controllers/authControllers/passport-controller");
const loginController = require("../../controllers/authControllers/login-controller");
const UniversalController = require("../../controllers/universal-controller");

// "/login"
router.route("/").get(UniversalController.sendIndex)
                 .post(PassportController.login)

router.get("/error", loginController.sendError);

module.exports = router;
