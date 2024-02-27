import React from "react";
import Post from "../Posts/Post/Post";

const PostsList = ({ posts }) => {
  return posts.map(({ _id, author, content, comments, likes, timestamp }) => (
    <Post
      key={_id}
      postId={_id}
      author={author}
      content={content}
      comments={comments}
      likes={likes}
      timestamp={timestamp}
    />
  ))
};

export default PostsList;
