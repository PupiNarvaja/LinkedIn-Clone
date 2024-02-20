const { generateToken } = require("../../auth/jwt");
const ModelFactory = require("../../models/model-factory");
const logger = require("../../log");
const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const CustomError = require("../../utils/CustomError");

const userModel = ModelFactory.getModel("user");

const generateTokenAndRedirect = asyncErrorHandler(async (req, res, next) => {
  const token = generateToken(req.user);
  const { _id: id } = req.user;

  const user = await userModel.getPublicUserInfo(id);

  if (!user) {
    return next(new CustomError("Error 404. User not found.", 404));
  }

  res.clearCookie("token");
  res.cookie("token", token);
  
  logger.info("Generating token and Sending user data...");
  res.send(user);
});

module.exports = {
  generateTokenAndRedirect,
};

//Change name if not redirecting.