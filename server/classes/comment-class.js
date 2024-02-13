class Comment {
  constructor(content, authorId) {
    this.content = content;
    this.authorId = authorId;
    this.timestamp = Date.now();
  }
}

module.exports = Comment;