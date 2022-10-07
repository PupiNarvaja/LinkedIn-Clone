const path = require("path");

const sendIndex = (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../../client/dist", "index.html"));
};

const redirectToHome = (req, res) => {
  res.redirect("/");
};

module.exports = {
  sendIndex,
  redirectToHome,
};
