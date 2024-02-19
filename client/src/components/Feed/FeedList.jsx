import React from "react";
import Post from "../Post/Post";

const FeedList = ({ posts }) => {
  return posts.map(({ _id, author, content, comments, likes, timestamp }) => (
    <Post
      key={_id}
      postId={_id}
      profile={author.profile}
      author={`${author.firstname} ${author.lastname}`}
      description={author.description}
      content={content}
      comments={comments}
      likes={likes}
      timestamp={timestamp}
    />
  ))
};

export default FeedList;
