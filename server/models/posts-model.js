const { Schema, model } = require("mongoose");
const userModel = require("./user-model");

class PostModel {
  constructor() {
    const schema = new Schema({
      authorId: String,
      message: String,
      comments: [{ body: String, date: Date }],
      timestamp: { type: Number, default: Date.now(), format: "%Y-%m-%d" },
    });

    this.model = model("posts", schema);
  }

  async getPosts() {
    const posts = await this.model.find();

    const completePosts = await Promise.all(posts.map(async (post) => {
      const { profile, firstname, lastname, description } = await userModel.getById(post.authorId);
      const { message, timestamp, comments } = post;

      return {
        message,
        timestamp,
        comments,
        profile,
        description,
        author: `${firstname} ${lastname}`
      }
    }))

    return completePosts;
  }

  async postPost(post, userId) {

    return await this.model.create({
      authorId: userId,
      message: post.message,
      timestamp: Date.now(),
    });
  }
}

module.exports = new PostModel();
