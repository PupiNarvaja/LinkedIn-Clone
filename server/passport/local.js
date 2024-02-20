const LocalStrategy = require("passport-local").Strategy;
// const mailSender = require("../notifications/mail");
const ModelFactory = require("../models/model-factory");
const logger = require("../log");
const userModel = ModelFactory.getModel("user");

module.exports = (passport) => {
  const authenticateUser = async (req, email, password, done) => {
    try {
      const user = await userModel.getUserByEmail(email);

      if (!user) {
        logger.error("Requested user does not exist.");
        return done(null, false, { message: "Requested user does not exist." });
      }

      const isPasswordValid = await userModel.isPasswordValid(email, password);

      if (!isPasswordValid) {
        logger.error("Wrong password!");
        return done(null, false, { message: "Wrong password." });
      }

      done(null, user);
    } catch (error) {
      logger.error("Error in local.js.", error?.message);
      return done(error);
    }
  };

  const registerUser = async (req, email, password, done) => {
    const { firstname, lastname, age, description, address, phone, profile, admin } = req.body;
    
    const user_already_exists = await userModel.existsByEmail(email);

    if (user_already_exists) {
      logger.error("There's an existing user with this email!");
      return done(null, false);
    }

    const user = await userModel.saveUser({
      email,
      password,
      firstname,
      lastname,
      age,
      description,
      address,
      phone,
      profile,
      admin,
    });

    done(null, user);
  };

  passport.use("login", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  }, authenticateUser));

  passport.use("register", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  }, registerUser));

  passport.serializeUser((user, done) => {
    done(null, user._id)
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    const userData = {
      _id: user._id.toString(),
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    }
    
    done(null, userData);
  });
};
