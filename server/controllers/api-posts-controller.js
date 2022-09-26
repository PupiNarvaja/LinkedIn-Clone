const postModel = require("../models/posts-model");
const logger = require("../log");

const getPosts = async (req, res) => {
  try {
    const data = await postModel.getPosts();
    res.status(200).send(data);
  } catch (error) {
    logger.error(error);
    res.status(500).send({ error: error.message });
  }
};

const postPost = async (req, res) => {
  const post = req.body;

  try {
    const data = await postModel.postPost(post);
    res.status(201).send(data);
  } catch (error) {
    logger.error(error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getPosts,
  postPost,
};
