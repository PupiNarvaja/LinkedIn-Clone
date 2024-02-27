import React from 'react';
import Loader from "../Loader/Loader";
import NewPost from "../Posts/NewPost/NewPost";
import FeedError from "./FeedError";
import PostsList from "../Posts/PostsList";
import { useSelector } from 'react-redux';
import useGetAndDispatchPosts from '../../customHooks/redux-hooks/useGetAndDispatchPosts';

const Feed = () => {
  const { isLoading, error } = useGetAndDispatchPosts();
  const posts = useSelector(state => state.posts.posts);

  return (
    <main className="mx-6 flex-[0.5]">
      <NewPost />
      <button className="w-full h-4 my-2">
        <hr className="w-full border-linkedin-lightgray"></hr>
      </button>

      { isLoading && <div className="mt-8"><Loader /></div> }
      { error && <FeedError error={error} /> }
      { posts && !error && <PostsList posts={posts} /> }

    </main>
  );
};

export default Feed;
