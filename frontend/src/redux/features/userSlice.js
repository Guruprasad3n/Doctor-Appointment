import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducer: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { getUser } = userSlice.actions;
