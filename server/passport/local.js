const LocalStrategy = require("passport-local").Strategy;
// const mailSender = require("../notifications/mail");
const ModelFactory = require("../models/model-factory");
const logger = require("../log");

const userModel = ModelFactory.getModel("user");

module.exports = (passport) => {
  const authenticateUser = async (email, password, done) => {
    try {
      if (!(await userModel.existsByEmail(email))) {
        logger.error("Requested user does not exist.");
        return done(null, false);
      }

      if (!(await userModel.isPasswordValid(email, password))) {
        logger.error("Wrong password!");
        return done(null, false);
      }

      const user = await userModel.getUserByEmail(email);

      done(null, user);
    } catch (error) {
      done(error);
    }
  };

  const registerUser = async (req, email, password, done) => {
    const { firstname, lastname, age, address, phone, profile, admin } = req.body;

    try {
      if (await userModel.existsByEmail(email)) {
        logger.error("There's an existing user with this email!");
        return done(null, false);
      }

      const user = await userModel.saveUser({
        email,
        password,
        firstname,
        lastname,
        age,
        address,
        phone,
        profile,
        admin,
      });

      // const newUser = await userModel.getById(user._id);

      // mailSender.newRegister(newUser);

      done(null, {
        ...user,
        id: user._id,
        name: `${firstname} ${lastname}`,
      });
    } catch (error) {
      done(error);
    }
  };

  passport.use("login", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
  }, authenticateUser));

  passport.use("register", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, registerUser));

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.getById(id);
    done(null, {
      id: user._id.toString(),
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    });
  });
};
