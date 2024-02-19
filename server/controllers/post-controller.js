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

const likeAPost = asyncErrorHandler(async (req, res, next) => {
  const { postId } = req.body;
  const { id } = req.user;

  const like = await postModel.likeAPost(id, postId);

  res.status(201).send(like);
});

const unlikeAPost = asyncErrorHandler(async (req, res, next) => {
  const { postId } = req.body;
  const { id } = req.user;

  const unlike = await postModel.unlikeAPost(id, postId);

  res.status(204).send(unlike);
});

module.exports = {
  getPosts,
  postPost,
  likeAPost,
  unlikeAPost,
};
