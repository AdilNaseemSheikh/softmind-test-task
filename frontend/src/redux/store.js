import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import postsReducer from "./slices/postsSlice";
import usersReducer from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    users: usersReducer,
  },
});
