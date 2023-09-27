const router = require("express").Router();
const PassportController = require("../../controllers/authControllers/passport-controller");
const UniversalController = require("../../controllers/universal-controller");

// "/register"
router.route("/").get(UniversalController.sendIndex)
                 .post(PassportController.register)

module.exports = router;
