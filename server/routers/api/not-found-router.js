const CustomError = require("../../utils/CustomError");

const router = require("express").Router();

// "*"
router.all("*", (req, res, next) => {
  const error = new CustomError(`Error 404. Can't find ${req.originalUrl}.`, 404);
  next(error);
});

module.exports = router;
