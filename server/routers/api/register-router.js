const router = require("express").Router();
const PassportController = require("../../controllers/authControllers/passport-controller");
const UniversalController = require("../../controllers/universal-controller");

// "/register"
router.get("/", UniversalController.sendIndex);

router.post("/", PassportController.register);

module.exports = router;
