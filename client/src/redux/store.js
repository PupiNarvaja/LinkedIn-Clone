import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/user-reducer';

const rootReducer = combineReducers({
  userReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = () => {
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
};

export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./features/userSlice"

// export default configureStore({
//   reducer: {
//     user: userReducer,
//   },
// });


// The Action calls and trigger the Reducer so it can modify the State.
// Dispatch -> Call any action from any reducer.