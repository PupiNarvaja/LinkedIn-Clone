const ModelFactory = require("../models/model-factory");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const postModel = ModelFactory.getModel("post");

const getPosts = asyncErrorHandler(async (req, res, next) => {
  const posts = await postModel.getPosts();

  res.send(posts);
});

const postPost = asyncErrorHandler(async (req, res, next) => {
  const post = req.body;
  const { id } = req.user;

  const data = await postModel.postPost(post, id);

  res.status(201).send(data);
});

const postComment = asyncErrorHandler(async (req, res, next) => {
  const { postId, content } = req.body;
  const { id } = req.user;

  await postModel.postComment(postId, id, content);

  res.sendStatus(201);
});


module.exports = {
  getPosts,
  postPost,
  postComment,
};
