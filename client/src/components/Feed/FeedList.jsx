import React from "react";
import Post from "../Post/Post";

const FeedList = ({ posts }) => {
  return posts.map(({ _id, profile, author, description, message, comments, timestamp }) => (
    <Post
      key={_id}
      profile={profile}
      author={author}
      description={description}
      message={message}
      comments={comments}
      timestamp={timestamp}
    />
  )).reverse()
};

export default FeedList;

// El reverse debería venir de la Data Base mejor.
