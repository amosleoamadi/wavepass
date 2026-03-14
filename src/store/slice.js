import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: "wavepass",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logoutUser: (state) => {
      ((state.user = null), (state.token = null));
    },
  },
});

export const { setToken, setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
