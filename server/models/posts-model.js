const { Schema, model } = require("mongoose");

class PostModel {
  constructor() {
    const schema = new Schema({
      photoUrl: String,
      author: String,
      description: String,
      message: String,
      comments: [{ body: String, date: Date }],
      timestamp: { type: Number, default: Date.now(), format: "%Y-%m-%d" },
    });

    this.model = model("posts", schema);
  }

  async getPosts() {
    return await this.model.find();
  }

  async postPost(post) {
    return await this.model.create(post);
  }
}

module.exports = new PostModel();
