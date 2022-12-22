const ModelFactory = require("../models/model-factory");
const logger = require("../log");

const userModel = ModelFactory.getModel("user");

const getUserInfo = async (req, res) => {
  if (!req.user) {
    console.log("No user pupi") // SE GUARDA EN LA SESSION. Se debe eliminar la session si no hay token LEER ABAJO ->
    return res.status(204).send({ error: "No user connected." });
  }

  const { id } = req.user;
  console.log(id)

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


// Verificar middleware en userController. Ya que si no está logueado, redireccionaba a login y enviaba HTML, entonces el user en redux se
// setebaba cmo \n \n y asi.
// Al recargar la pagina, se solicita la info del user. El problema es que si se solicita sin token PERO con session activa,
// Se obtiene y se setea el user en redux incluso el usuario no estando logueado. Hay que destruir la sesison o resetear el user en cliuente. Para eso,
// Averiguar redux vovler al initial state.