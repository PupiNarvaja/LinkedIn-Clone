const { verifyToken } = require("../auth/jwt");
const logger = require("../log");

module.exports = (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies.token) {
    if (req.session) {
      logger.info("session destroyed.");
      req.session.destroy();
    }

    logger.error("There is no token!");
    return res.redirect("/login");
  }

  const token = cookies.token;

  if (!verifyToken(token)) {
    return res.redirect("/login");
  }
  
  //logger.info("Valid token!");

  next();
};

//Hay que solucionar el tema de almacenar en react el token, porque no logro que con cada request, el cliente envie los headers correspondientes.
// Nueva suposición: Guardar el token en context/redux. Usar useFetch para centralizar las requests e incluir siempre el token.