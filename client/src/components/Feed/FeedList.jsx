import React from "react";
import Post from "../Post/Post";

const FeedList = ({ posts }) => {
  return posts.map(({ _id, photoUrl, author, description, message, comments, timestamp }) => (
    <Post
      key={_id}
      photoUrl={photoUrl}
      author={author}
      description={description}
      message={message}
      comments={comments}
      timestamp={timestamp}
    />
  )).reverse()
};

export default FeedList;
