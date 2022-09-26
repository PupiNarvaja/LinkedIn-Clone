(async () => {
  require("dotenv").config();
  const express = require("express");
  const session = require("express-session");
  const mongoose = require("mongoose");
  const mongoStore = require("connect-mongo");
  const cors = require("cors");
  const compression = require("compression");

  const app = express();

  const logger = require("./log");

  // Routes
  const postsRouter = require("./routers/api/api-posts-router");
  const { URI_CLOUD_CONNECTION, PORT } = require("./config");

  try {
    await mongoose.connect(URI_CLOUD_CONNECTION);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(compression());
    app.use(cors());
    app.use(
      session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,

        store: new mongoStore({
          mongoUrl: URI_CLOUD_CONNECTION,
          ttl: 60 * 30,
          expires: 60 * 30,
          autoRemove: "native",
        }),
      })
    );

    app.use("/api/posts", postsRouter);

    app.listen(PORT, () => logger.info(`🚀 Server online. Running on port: ${PORT}`));
  } catch (error) {
    logger.error("Error on mongo.", error);
  }
})();
