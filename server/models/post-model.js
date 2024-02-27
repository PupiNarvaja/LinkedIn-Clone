const { Schema } = require("mongoose");
const BaseModel = require("./base-model");

class PostModel extends BaseModel {
  constructor() {
    const schema = new Schema({
      author: { type: Schema.Types.ObjectId, ref: "users", required: true },
      comments: [{ type: Schema.Types.ObjectId, ref: "comments", required: true }],
      likes: [{ type: Schema.Types.ObjectId, ref: "users", required: true }],
      content: { type: String, required: true },
      timestamp: { type: Number, default: Date.now(), format: "%Y-%m-%d", required: true },
    });

    super(schema, "posts");
  }
  
  // Only helps other methods.
  async updateLikeInPost(postId, update) {
    const filter = { _id: postId };

    const like = await this.model.findOneAndUpdate(filter, update);

    return like;
  }

  // Only helps other methods.
  async isUserPostAuthor(userId, postId) {
    const post = await this.model.findById(postId);
    const isPostAuthor = post.author._id.toString() === userId.toString();

    return isPostAuthor;
  }

  async getPosts() {
    const sort = { timestamp: -1 };
    
    const authorProperties = {
      path: "author",
      select: "firstname lastname profile description url"
    }

    const commentsProperties = {
      path: "comments",
      select: "author content timestamp postId",
      populate: {
        path: "author",
        select: "firstname lastname profile description url"
      }
    }

    const likesProperties = {
      path: "likes",
      select: "firstname lastname profile description url",
    }

    const posts = await this.model
    .find()
    .populate(authorProperties)
    .populate(commentsProperties)
    .populate(likesProperties)
    .sort(sort)
    .lean();

    return posts;
  }

  async postPost(post, userId) {
    const postInfo = {
      author: userId,
      content: post.content,
      timestamp: Date.now(),
    }

    return await this.model.create(postInfo);
  }

  async deletePost(postId) {
    const filter = { _id: postId }
    return await this.model.findOneAndDelete(filter);
  }
  
  async updatePostWithComment(postId, commentId) {
    const filter = { _id: postId };
    const update = { $push: { comments: commentId } };

    return await this.model.findOneAndUpdate(filter, update);
  }

  async populateAuthor(postId) {
    const authorProperties = {
      path: "author",
      select: "firstname lastname profile description url",
    };

    return await this.model.
      findById(postId)
      .populate(authorProperties);
  }

  async likeAPost(userId, postId) {
    const update = { $push: { likes: userId }};

    await this.updateLikeInPost(postId, update);
  }

  async unlikeAPost(userId, postId) {
    const update = { $pull: { likes: userId }};

    await this.updateLikeInPost(postId, update);
  }
}

module.exports = new PostModel();
