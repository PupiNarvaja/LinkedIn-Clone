const ModelFactory = require("../models/model-factory");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const commentModel = ModelFactory.getModel("comment");

const postComment = asyncErrorHandler(async (req, res, next) => {
  const { postId, content } = req.body;
  const { _id: id } = req.user;

  const comment = await commentModel.postComment(postId, id, content);

  res.status(201).send(comment);
});

module.exports = {
  postComment,
};
