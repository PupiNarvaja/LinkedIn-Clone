const path = require("path");

const sendIndex = (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../client/dist", "index.html"));
};

module.exports = {
  sendIndex,
};
