const { Schema } = require("mongoose");
const userModel = require("./user-model");
const BaseModel = require("./base-model");

class PostModel extends BaseModel {
  constructor() {
    const schema = new Schema({
      authorId: String,
      message: String,
      comments: [{ body: String, date: Date }],
      timestamp: { type: Number, default: Date.now(), format: "%Y-%m-%d" },
    });

    super(schema, "posts");
  }

  async getPosts() {
    const sort = { timestamp: -1 };
    const posts = await this.model.find().sort(sort);

    const allPosts = await Promise.all(posts.map(async (post) => {
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

    return allPosts;
  }

  async postPost(post, userId) {
    const postInfo = {
      authorId: userId,
      message: post.message,
      timestamp: Date.now(),
    }

    return await this.model.create(postInfo);
  }
}

module.exports = new PostModel();
