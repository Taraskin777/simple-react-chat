import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newComment: "",
  searchName: "",
  chuck: true,
  
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
   
  },
});

export const data = () => initialState;

export default userDataSlice.reducer;
