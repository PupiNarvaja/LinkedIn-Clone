import React from "react";
import Post from "../Post/Post";

const FeedList = ({ posts }) => {
  return posts.map(({ _id, profile, author, description, content, comments, timestamp }) => (
    <Post
      key={_id}
      profile={profile}
      author={author}
      description={description}
      content={content}
      comments={comments}
      timestamp={timestamp}
    />
  ))
};

export default FeedList;
