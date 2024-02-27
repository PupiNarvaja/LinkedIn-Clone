import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { setPosts } from "../../redux/features/postsSlice";
import useFetch from "../useFetch";

const useGetAndDispatchPosts = () => {
  const dispatch = useDispatch();
  
  const { data: posts, isLoading, error, status } = useFetch("http://localhost:8080/api/posts", []);
  
  useEffect(() => {
    dispatch(setPosts(posts));
  }, [posts, dispatch]);

  return { posts, isLoading, error, status };
}

export default useGetAndDispatchPosts;
