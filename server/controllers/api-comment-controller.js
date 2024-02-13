const commentModel = require("../models/comment-model");
const logger = require("../log");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const getComments = asyncErrorHandler(async (req, res, next) => {
  const comments = await commentModel.getComments();

  res.send(comments);
});

const postComment = asyncErrorHandler(async (req, res, next) => {
  const { postId, content, userId } = req.body;
  //const { userId } = req.user;

  await commentModel.postComment(postId, userId, content);

  res.sendStatus(201);
});

module.exports = {
  getComments,
  postComment,
};
