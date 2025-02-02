import { createSlice } from "@reduxjs/toolkit";
import { useAuth } from "../../hooks/useAuth";

const initialState = {
  loading: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading, setUser } = authSlice.actions;

export const authenticate = () => {
  return async (dispatch, state) => {
    dispatch({ type: "auth/setLoading", payload: true });
    const data = await useAuth();

    dispatch({
      type: "auth/setUser",
      payload: data,
    });

    dispatch({
      type: "auth/setLoading",
      payload: false,
    });
  };
};

export default authSlice.reducer;
