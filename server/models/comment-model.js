const { Schema } = require("mongoose");
const BaseModel = require("./base-model");
const postModel = require("./post-model");

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

  // Helps other methods.
  async createComment(postId, author, content) {
    const comment = {
      author,
      content,
      postId,
      timestamp: Date.now(),
    };

    return await this.model.create(comment);
  }

  // Helps other methods.
  async updatePostWithComment(postId, commentId) {
    const filter = { _id: postId };
    const update = { $push: { comments: commentId } };

    return await postModel.findOneAndUpdate(filter, update);
  }

  async postComment(postId, authorId, content) {
    const comment = await this.createComment(postId, authorId, content);

    await this.updatePostWithComment(postId, comment._id);

    const authorProperties = {
      path: "author",
      select: "firstname lastname profile description url",
    };

    const newComment = await this.model
      .findById(comment._id)
      .populate(authorProperties)
      .lean();

    return newComment;
  }
}

module.exports = new CommentModel();

// Comentarios propios deberian siempre ser visibles.




// Crear opcion eliminar commentario.
// Si un post es eliminado, todos sus comentarios deben serlo tambien.
// Funcion de likes.