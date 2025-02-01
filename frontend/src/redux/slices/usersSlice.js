import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "superadmin",
    },
  ],
  loading: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
