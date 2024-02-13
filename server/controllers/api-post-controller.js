const postModel = require("../models/post-model");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

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
  const { postId, content, authorId } = req.body;
  //const { authorId } = req.user;

  await postModel.postComment(postId, authorId, content);

  res.sendStatus(201);
});


module.exports = {
  getPosts,
  postPost,
  postComment,
};
