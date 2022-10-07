const ModelFactory = require("../models/model-factory");
const logger = require("../log");

const userModel = ModelFactory.getModel("user");

const getUserInfo = async (req, res) => {
  const { id } = req.user;

  try {
    const { address, admin, age, email, firstname, lastname, phone, profile, _id } = await userModel.getById(id);
    const user = { address, admin, age, email, firstname, lastname, phone, profile, _id }; //Refactorizar.
    res.send(user);
  } catch (error) {
    logger.error(error);
    res.status(500).send({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.send(users);
  } catch (error) {
    logger.error(error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getUserInfo,
  getAllUsers,
};
