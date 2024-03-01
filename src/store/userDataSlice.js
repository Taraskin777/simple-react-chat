import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newComment: "",
  searchName: "",
  chuck: true,
  name: "Sergio",
  avatar: "../images/sergio.png",
  id: 2,
  messagesList: [],
  usersList: [],
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
    setName: (state, action) => {
      state.name = action.payload;
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setMessagesList: (state, action) => {
      state.messagesList = action.payload;
    },
    setUsersList: (state, action) => {
      state.usersList = action.payload;
    },
  },
});

export const {
  setNewComment,
  setSearchName,
  setName,
  setAvatar,
  setId,
  setMessagesList,
  setUsersList,
} = userDataSlice.actions;


export default userDataSlice.reducer;
