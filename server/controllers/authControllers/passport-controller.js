const passport = require("passport");

const login = passport.authenticate("login", {
  successRedirect: "/auth/jwt",
  failureRedirect: "/login/error",
  failureMessage: true // Make sure this is essensial.
})

const register = passport.authenticate("register", {
  successRedirect: "/auth/jwt",
  failureRedirect: "/register",
});

module.exports = {
  login,
  register,
};
