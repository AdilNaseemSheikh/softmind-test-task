import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    { id: 1, title: "Post 1", content: "Content of post 1", thumbnail: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg' },
    { id: 2, title: "Post 2", content: "Content of post 2", thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFRQjM-wM_nXMA03AGDXgJK3VeX7vtD3ctA&s' },
    { id: 2, title: "Post 3", content: "Content of post 3", thumbnail: 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' },
  ],
  loading: false
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
