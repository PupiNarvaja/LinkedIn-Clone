const ModelFactory = require("../models/model-factory");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const postModel = ModelFactory.getModel("post");
const commentModel = ModelFactory.getModel("comment");

const getPosts = asyncErrorHandler(async (req, res, next) => {
  const posts = await postModel.getPosts();

  res.send(posts);
});

const postPost = asyncErrorHandler(async (req, res, next) => {
  const post = req.body;
  const { _id: id } = req.user;

  const comment = await postModel.postPost(post, id);

  const commentWithAuthor = await postModel.populateAuthor(comment._id);

  res.status(201).send(commentWithAuthor);
});

const deletePost = asyncErrorHandler(async (req, res) => {
  const { _id: id } = req.user;
  const postId = req.params.id;
  // Obtener post.
  // Corroborar que el usuario solicitante es el author.
  // Eliminar los commentarios cuyo id este dentro del post.
  // Eliminar los likes del user (Not now)
  // Eliminar el post.

  const post = await postModel.findById(postId); //✅

  if (!post) {
    return res.status(404).send("Post not found");
  }

  if (post.author.toString() !== id) {
    return res.status(403).send("Unauthorized"); //Maybe userModel.isUserAuthor(userId, postId.author)
  }

  await commentModel.deleteCommentsFromDeletedPost(post.comments); //✅

  await postModel.deletePost(postId); //✅

  return res.sendStatus(204);
});

const likeAPost = asyncErrorHandler(async (req, res, next) => {
  const { postId } = req.body;
  const { _id: id } = req.user;

  const like = await postModel.likeAPost(id, postId);

  res.status(201).send(like);
});

const unlikeAPost = asyncErrorHandler(async (req, res, next) => {
  const { postId } = req.body;
  const { _id: id } = req.user;

  const unlike = await postModel.unlikeAPost(id, postId);

  res.status(204).send(unlike);
});

module.exports = {
  getPosts,
  postPost,
  deletePost,
  likeAPost,
  unlikeAPost,
};
