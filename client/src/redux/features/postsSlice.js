import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    postPost: (state, action) => {
      state.posts = [action.payload, ...state.posts];
    },
    deletePost: (state, action) => {
      const postId = action.payload;
      state.posts = state.posts.filter(post => post._id !== postId);
    },
    addComment: (state, action) => {
      const { postId, updatedComment } = action.payload;
      const post = state.posts.find(post => post._id === postId);
      post.comments = [...post.comments, updatedComment];
    },
    deleteComment: (state, action) => {
      const { commentId, postId } = action.payload;
      const post = state.posts.find(post => post._id === postId);
      post.comments = post.comments.filter(comment => comment._id !== commentId);
    },
  },
});

export const { setPosts, postPost, deletePost, addComment, deleteComment } = postsSlice.actions;

export default postsSlice.reducer;