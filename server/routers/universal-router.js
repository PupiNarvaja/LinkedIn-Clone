const router = require("express").Router();
const UniversalController = require("../controllers/universal-controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

//  "/", "/cart", "/order", "/profile"

// It sends index.html file. (NOTE: as React js is being used, same index.html it's send for every page requested.)
router.get("/", isAuthenticated, UniversalController.sendIndex);

module.exports = router;
