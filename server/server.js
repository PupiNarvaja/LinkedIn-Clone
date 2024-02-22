const globalErrorHandler = require("./middlewares/globalErrorHandler");

(async () => {
  require("dotenv").config();
  const express = require("express");
  const session = require("express-session");
  const cookieParser = require("cookie-parser");
  const mongoose = require("mongoose");
  const mongoStore = require("connect-mongo");
  const cors = require("cors");
  const passport = require("passport");
  const path = require("path");
  //const compression = require("compression");
  // Usar Helmet
  
  const app = express();
  
  const logger = require("./log");
  const initializePassport = require("./passport/local");

  // Routes import
  const universalRouter = require("./routers/universal-router");
  const postRouter = require("./routers/api/post-api-router");
  const commentRouter = require("./routers/api/comment-router");
  const loginRouter = require("./routers/api/login-api-router");
  const registerRouter = require("./routers/api/register-router");
  const userRouter = require("./routers/api/user-api-router");
  const jwtRouter = require("./routers/api/jwt-api-router");
  const notFoundRouter = require("./routers/api/not-found-router");

  const { URI_CLOUD_CONNECTION, PORT, SESSION_SECRET } = require("./config");

  const sessionConfig = {
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true },

    store: new mongoStore({
      mongoUrl: URI_CLOUD_CONNECTION,
      ttl: 60 * 30,
      expires: 60 * 30,
      autoRemove: "native",
    }),
  }

  try {
    await mongoose.connect(URI_CLOUD_CONNECTION);

    initializePassport(passport);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser(SESSION_SECRET))
    // app.use(compression());
    app.use(cors());
    app.use(session(sessionConfig));

    // Passport initialization
    app.use(passport.initialize());
    app.use(passport.session());

    app.use("/assets/", express.static(path.join(__dirname, "../client/dist/assets")));
    app.use("/static/", express.static(path.join(__dirname, "../client/dist")));
    app.use("/assets/", express.static(path.join(__dirname, "/assets")));

    // Routes
    app.use("/", universalRouter);

    app.use("/feed", universalRouter);

    app.use("/in/:user", universalRouter);

    app.use("/api/posts", postRouter);

    app.use("/api/comments", commentRouter);

    app.use("/login", loginRouter);

    app.use("/register", registerRouter);

    app.use("/auth/jwt", jwtRouter);

    app.use("/api/users", userRouter);

    app.use("*", notFoundRouter);

    app.use(globalErrorHandler);

    app.listen(PORT, () => logger.info(`🚀 Server online. Running on port: ${PORT}`));
  } catch (error) {
    logger.error("Error on Database connection.", error);
  }
})();


// Al expirar el token, si el usuario da like por ej,
// llega error cannot destructure property "id" of "req.user"
// as it is undefined.

// Futuras ideas: Independizar react. Que el server solo envíe info, no HTML.
// Abstraer los métodos de los modelos, para poder swapear DBs sin problema.
// Rediseñar sistema de logueo y registro. (LUEGO de separar front y back.) Nota: interceptar las requests del cliente con custom hook.


// Notas:
// Al usar SINGLETON para las instancias de modelo, junto con el factory y el pub/sub logramos:
// Utilizar una unica instancia de modelos (SINGLETON).
// Centralizar la creación y exportación de instancias en un lugar (FACTORY).
// Notificar a los demas modelos necesarios que hubo determinado cambio por el cuál deben realizar acciones. (PUB/SUB).

// A revisar:
// Inyeccion de dependencias.
// Patron repository.
// Arquitectura hexagonal.