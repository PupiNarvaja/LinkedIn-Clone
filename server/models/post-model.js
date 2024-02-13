const { Schema } = require("mongoose");
const userModel = require("./user-model");
const BaseModel = require("./base-model");

class PostModel extends BaseModel {
  constructor() {
    const schema = new Schema({
      author: { type: Schema.Types.ObjectId, ref: 'User' },
      content: String,
      comments: [{ type: Object }],
      timestamp: { type: Number, default: Date.now(), format: "%Y-%m-%d" },
    });

    super(schema, "posts");
  }

  async getPosts() {
    const sort = { timestamp: -1 };
    const posts = await this.model.find().sort(sort);

    const allPosts = await Promise.all(posts.map(async (post) => {
      const { profile, firstname, lastname, description } = await userModel.getById(post.author);
      const { content, timestamp, comments } = post;

      return {
        content,
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
      author: userId,
      content: post.content,
      timestamp: Date.now(),
    }

    return await this.model.create(postInfo);
  }

  async postComment(postId, comment) {
    return await this.model.findOneAndUpdate(postId, { $push: { comments: comment } });
  }
}

module.exports = new PostModel();
