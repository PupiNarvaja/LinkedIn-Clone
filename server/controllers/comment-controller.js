const ModelFactory = require("../models/model-factory");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const commentModel = ModelFactory.getModel("comment");
const postModel = ModelFactory.getModel("post");

const postComment = asyncErrorHandler(async (req, res, next) => {
  const { postId, content } = req.body;
  const { _id: id } = req.user;

  const comment = await commentModel.createComment(postId, id, content);

  await postModel.updatePostWithComment(postId, comment._id);

  const populatedComment = await commentModel.getPopulatedComment(comment._id);
  
  res.status(201).send(populatedComment);
});

module.exports = {
  postComment,
};
