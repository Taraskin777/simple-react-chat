import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newComment: "",
  testComment: "New comment",
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {},
});

export const comment = () => initialState;

export default userDataSlice.reducer;
