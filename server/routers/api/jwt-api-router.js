const router = require("express").Router();
const passportAuth = require("../../middlewares/passportAuth");
const JwtController = require("../../controllers/authControllers/jwt-controller");

// "/auth/jwt"
router.get("/", passportAuth, JwtController.generateTokenAndRedirect);

module.exports = router;
