const ModelFactory = require("../models/model-factory");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const userModel = ModelFactory.getModel("user");

const getUserInfo = asyncErrorHandler(async (req, res, next) => {
  const { _id: id } = req.user;

  const user = await userModel.getPublicUserInfo(id);

  if (!user) {
    return next(new CustomError("Error 404. User not found.", 404));
  }

  res.send(user);
});

const getAllUsers = asyncErrorHandler(async (req, res, next) => {
  const users = await userModel.getAllUsers();

  res.send(users);
});

const getSuggestedUsers = asyncErrorHandler(async (req, res, next) => {
  const { _id: id } = req.user;

  const users = await userModel.getSuggestedUsers(id);
  
  res.send(users);
});

const getUserByUrl = asyncErrorHandler(async (req, res, next) => {
  const url = req.params.user;

  const user = await userModel.getUserByUrl(url);

  if (!user) {
    return next(new CustomError(`No user found for url: "${url}"`, 404));
  }

  res.send(user);
});

const updateProfilePicture = asyncErrorHandler(async (req, res, next) => {
  await userModel.updateProfilePicture(req);

  res.sendStatus(200);
});

module.exports = {
  getUserInfo,
  getAllUsers,
  getSuggestedUsers,
  getUserByUrl,
  updateProfilePicture
};
