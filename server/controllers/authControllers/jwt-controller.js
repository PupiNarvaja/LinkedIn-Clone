const { generateToken } = require("../../auth/jwt");
const ModelFactory = require("../../models/model-factory");
const logger = require("../../log");

const userModel = ModelFactory.getModel("user");

const generateTokenAndRedirect = async (req, res) => {
  logger.info("Generating token...");
  const token = generateToken(req.user);

  const { id } = req.user
  const { address, admin, age, email, firstname, lastname, phone, profile, _id } = await userModel.getById(id);
  const user = { address, admin, age, email, firstname, lastname, phone, profile, _id }; //Refactorizar. Maybe getPublicUserInfo

  res.clearCookie("token");
  res.cookie("token", token);

  logger.info("Sending user data...");
  res.send(user);
};

module.exports = {
  generateTokenAndRedirect,
};

//Change name if not redirecting.