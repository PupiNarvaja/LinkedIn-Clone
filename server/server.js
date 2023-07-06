(async () => {
  require("dotenv").config();
  const express = require("express");
  const session = require("express-session");
  const cookieParser = require("cookie-parser");
  const mongoose = require("mongoose");
  const mongoStore = require("connect-mongo");
  const cors = require("cors");
  const compression = require("compression");
  const passport = require("passport");
  const path = require("path");

  const app = express();
  const initializePassport = require("./passport/local");

  const logger = require("./log");

  // Routes import
  const universalRouter = require("./routers/universal-router");
  const postsRouter = require("./routers/api/posts-api-router");
  const loginRouter = require("./routers/api/login-api-router");
  const registerRouter = require("./routers/api/register-router");
  const userRouter = require("./routers/api/user-api-router");
  const jwtRouter = require("./routers/api/jwt-api-router");  

  const { URI_CLOUD_CONNECTION, PORT, SESSION_SECRET } = require("./config");

  try {
    await mongoose.connect(URI_CLOUD_CONNECTION);

    initializePassport(passport);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser(SESSION_SECRET))
    // app.use(compression());
    app.use(cors());
    app.use(
      session({
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
      })
    );

    // Passport initialization
    app.use(passport.initialize());
    app.use(passport.session());

    app.use("/assets/", express.static(path.join(__dirname, "../client/dist/assets")))
    app.use("/static/", express.static(path.join(__dirname, "../client/dist")))

    // Routes
    app.use("/", universalRouter);

    app.use("/feed", universalRouter);

    app.use("/in/:user", universalRouter);

    app.use("/api/posts", postsRouter);

    app.use("/login", loginRouter);

    app.use("/register", registerRouter);

    app.use("/auth/jwt", jwtRouter);

    app.use("/api/users", userRouter);

    // Server listening
    app.listen(PORT, () => logger.info(`🚀 Server online. Running on port: ${PORT}`));
  } catch (error) {
    logger.error("Error on mongo.", error);
  }
})();
