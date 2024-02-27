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

const deleteComment =  asyncErrorHandler(async (req, res, next) => {
  const commentId = req.params.id;
  const { _id: id } = req.user;

  const comment = await commentModel.findById(commentId);

  const isUserCommentAuthor = comment.author.toString() === id;

  if (!isUserCommentAuthor) {
    const isUserPostAuthor = postModel.isUserPostAuthor(id, comment.postId);

    if (!isUserPostAuthor) {
      return res.status(403).send("Unauthorized");
    }
  }

  await commentModel.deleteComment(commentId); // Si hay comments de comments o like a comments, habrá que revisar.

  return res.sendStatus(204);
});

module.exports = {
  postComment,
  deleteComment,
};
