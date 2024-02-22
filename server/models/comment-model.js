const { Schema } = require("mongoose");
const BaseModel = require("./base-model");

class CommentModel extends BaseModel {
  constructor() {
    const schema = new Schema({
      author: { type: Schema.Types.ObjectId, ref: "users", required: true },
      postId: { type: Schema.Types.ObjectId, ref: "posts", required: true },
      content: { type: String, required: true },
      timestamp: { type: Number, default: Date.now(), format: "%Y-%m-%d", required: true },
      // Likes
    });

    super(schema, "comments");
  }

  async createComment(postId, author, content) {
    const comment = {
      author,
      content,
      postId,
      timestamp: Date.now(),
    };

    return await this.model.create(comment);
  }

  async deleteComment(commentId) {
    const filter = { _id: commentId }
    const deleted = await this.model.findOneAndDelete(filter);

    return deleted;
  }

  async getPopulatedComment(commentId) {
    const authorProperties = {
      path: "author",
      select: "firstname lastname profile description url",
    };

    return await this.model.
      findById(commentId)
      .populate(authorProperties);
  }

  async deleteCommentsFromDeletedPost(comments) {
    if (comments.length === 0) {
      return;
    }

    const filter = { _id: { $in: comments } };
    
    return await this.model.deleteMany(filter);
  }
}

module.exports = new CommentModel();

// Comentarios propios deberian siempre ser visibles.
// Funcion de likes.