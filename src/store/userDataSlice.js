import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addComment,
  chuckNorris,
  changeLastMessage,
  getListOfMessages,
} from '../services/httpservices';
import {
  timeForListOfUsers,
  timeForSingleChat,
} from '../components/utils/dateUtils';

export const sendMessage = createAsyncThunk(
  'userData/sendMessage',
  async ({ id, newComment, chuck, avatar, name }, { dispatch }) => {
    const urlForPutLastMessage = `${process.env.REACT_APP_USERS}/${id}`;
    try {
      await addComment(
        process.env.REACT_APP_MESSAGES,
        timeForSingleChat(new Date()),
        newComment,
        !chuck,
        id
      );
      await changeLastMessage(
        urlForPutLastMessage,
        id,
        avatar,
        timeForListOfUsers(new Date()),
        newComment,
        name
      );

      const chuckTimer = setTimeout(async () => {
        try {
          const data = await chuckNorris();
          await addComment(
            process.env.REACT_APP_MESSAGES,
            timeForSingleChat(new Date()),
            data.value,
            chuck,
            id
          );
          dispatch(
            userDataSlice.actions.addMessage({
              comment: data.value,
              date: timeForSingleChat(new Date()),
              chuck: chuck,
              id: data.id,
              userId: id,
            })
          );
        } catch (error) {
          console.error('Error fetching Chuck Norris data:', error);
        } finally {
          clearTimeout(chuckTimer);
        }
      }, 3000);

      const data = await getListOfMessages(
        `${process.env.REACT_APP_MESSAGES_FROM_USER}${id}`
      );
      dispatch(setMessagesList(data));
      dispatch(setNewComment(''));
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

const initialState = {
  newComment: '',
  searchName: '',
  chuck: true,
  name: 'Sergio',
  avatar: '../images/sergio.png',
  id: 2,
  messagesList: [],
  usersList: [],
};

export const userDataSlice = createSlice({
  name: 'userData',
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
    addMessage: (state, action) => {
      state.messagesList.push(action.payload);
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
