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
    setNewComment: (state, action) => {
      state.newComment = action.payload;
    },
    setSearchName: (state, action) => {
      state.searchName = action.payload;
    },
  },
});

export const { setNewComment, setSearchName } = userDataSlice.actions;

// export const data = () => initialState;

export default userDataSlice.reducer;
