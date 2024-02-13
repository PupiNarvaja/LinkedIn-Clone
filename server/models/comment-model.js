const { Schema } = require("mongoose");
const commentModel = require("./comment-model");
const PostModel = require("./post-model");
const mongoose = require("mongoose");
const BaseModel = require("./base-model");

class CommentModel extends BaseModel {
  constructor() {
    const schema = new Schema({
      author: String,
      content: String,
      post: { type: Schema.Types.ObjectId, ref: "Post" },
      timestamp: { type: Number, default: Date.now(), format: "%Y-%m-%d" },
    });

    super(schema, "comment");
  }

  async getComments(postId) {
    const sort = { timestamp: -1 };
    const comments = await this.model.find({ postId }).sort(sort);

    return comments;
  }

  async postComment(postId, authorId, content) {
    const comment = {
      content: content,
      authorId: authorId,
      timestamp: Date.now(),
    };

    return await PostModel.postComment(postId, comment);
  }
}

module.exports = new CommentModel();
