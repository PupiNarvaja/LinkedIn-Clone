import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice"

export default configureStore({
  reducer: {
    user: userReducer,
  },
});


// The Action calls and trigger the Reducer so it can modify the State.
// Dispatch -> Call any action from any reducer.