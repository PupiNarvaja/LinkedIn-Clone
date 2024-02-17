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

module.exports = {
  getPosts,
  postPost,
};
