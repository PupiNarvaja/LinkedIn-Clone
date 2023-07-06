const ModelFactory = require("../models/model-factory");
const logger = require("../log");

const userModel = ModelFactory.getModel("user");

const getUserInfo = async (req, res) => {
  // if (!req.user) {
  //   console.log("No user pupi") // SE GUARDA EN LA SESSION. Se debe eliminar la session si no hay token LEER ABAJO ->
  //   return res.status(204).send({ error: "No user connected." }); CONTROLAR
  // }
  const { id } = req.user;

  try {
    const { address, admin, age, email, firstname, lastname, description, phone, profile, url, _id } = await userModel.getById(id);
    const user = { address, admin, age, email, firstname, lastname, description, phone, profile, url, _id }; //Refactorizar.
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

const getSuggestedUsers = async (req, res) => {
  const { id } = req.user;
  
  try {
    const users = await userModel.getSuggestedUsers(id);
    res.send(users);
  } catch (error) {
    logger.error(error);
    res.status(500).send({ error: error.message });
  }
}

const getUserByUrl = async (req, res) => {
  const url = req.params.user;

  try {
    const user = await userModel.getUserByUrl(url);
    console.log("user", user)

    if (!user) {
      return res.status(404).send({ error: `No user found for url: "${url}"` });
    }

    res.send(user);
  } catch (error) {
    logger.error(error);
    res.status(500).send({ error: error.message });
  }
}

module.exports = {
  getUserInfo,
  getAllUsers,
  getSuggestedUsers,
  getUserByUrl
};
