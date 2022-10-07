const router = require("express").Router();
const PassportController = require("../../controllers/authControllers/passport-controller");
const UniversalController = require("../../controllers/universal-controller");

// "/login"
router.get("/", UniversalController.sendIndex);

router.post("/", PassportController.login);

module.exports = router;
