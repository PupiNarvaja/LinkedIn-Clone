import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./features/userSlice";
import postsReducer from "./features/postsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
  },
});

export default store;