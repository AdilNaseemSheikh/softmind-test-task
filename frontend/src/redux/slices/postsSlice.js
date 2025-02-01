import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    { id: 1, title: "Post 1", content: "Content of post 1" },
    { id: 2, title: "Post 2", content: "Content of post 2" },
  ],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
});

export const { addPost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
