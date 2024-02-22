import React from "react";
import Comment from "../Comment/Comment";

const CommentsList = ({ comments }) => {
  return comments.map(({ _id, author, content, timestamp }) => (
    <Comment
      key={_id}
      commentId={_id}
      author={author}
      content={content}
      timestamp={timestamp}
    />
  ))
};

export default CommentsList;
