import React from 'react';
import { useState, useEffect } from 'react';
import Filter from './components/filter/Filter';
import Chats from './components/chats/Chats';
import SingleChat from './components/singlechat/SingleChat';
import {
  getListOfMessages,
  addComment,
  chuckNorris,
  changeLastMessage,
} from './services/httpservices';
import { useSelector, useDispatch } from 'react-redux';
import { setNewComment } from './store/userDataSlice';
import {
  timeForListOfUsers,
  timeForSingleChat,
} from './components/utils/dateUtils';

import { db } from './components/utils/firebase';
import { equalTo, onValue, orderByChild, ref, query } from 'firebase/database';

import './App.css';

function App() {
  const [messagesList, setMessagesList] = useState([]);

  const { chuck, newComment, name, id, avatar } = useSelector(
    (state) => state.data
  );

  const dispatch = useDispatch();

  const users = process.env.REACT_APP_USERS;
  const messageFromUser = process.env.REACT_APP_MESSAGES_FROM_USER;
  const addMessage = process.env.REACT_APP_MESSAGES;

  console.count('app render');

  // get users from firebase

  // useEffect(() => {
  //   const query = ref(db, "users");

  //   return onValue(query, (snapshot) => {
  //     const data = snapshot.val();

  //     if (snapshot.exists()) {
  //       Object.values(data).map((user) => {
  //         return setUsersList((users) => [...users, user]);
  //       });
  //     }
  //   });
  // }, []);

  // console.log(usersList);

  // get messages by particular user ID

  // useEffect(() => {
  //   // Створюємо посилання на колекцію "messages"
  //   const messagesRef = ref(db, "messages");

  //   // Створюємо запит з вказанням фільтрації
  //   const filteredQuery = query(
  //     messagesRef,
  //     orderByChild("userId"),
  //     equalTo(id)
  //   );

  //   // Встановлюємо обробник подій для запиту
  //   return onValue(filteredQuery, (snapshot) => {
  //     const data = snapshot.val();

  //     if (snapshot.exists()) {
  //       const messages = Object.values(data);
  //       setMessagesById(messages);
  //     }
  //   });
  // }, [id]);

  // console.log(messagesById);

  const onSendMessage = async (e) => {
    const urlForPutLastMessage = `${users}/${id}`;
    e.preventDefault();
    try {
      addComment(
        addMessage,
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
          addComment(
            addMessage,
            timeForSingleChat(new Date()),
            data.value,
            chuck,
            id
          );
          setMessagesList((prevdata) => [
            ...prevdata,
            {
              comment: data.value,
              date: timeForSingleChat(new Date()),
              chuck: chuck,
              id: data.id,
              userId: id,
            },
          ]);
        } catch (error) {
          console.error('Error fetching Chuck Norris data:', error);
        } finally {
          return () => clearTimeout(chuckTimer);
        }
      }, 3000);

      const data = await getListOfMessages(`${messageFromUser}${id}`);
      setMessagesList(data);
      dispatch(setNewComment(''));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getListOfMessages(`${messageFromUser}${id}`)
      .then((data) => setMessagesList(data))
      .catch((error) => console.log(error));
  }, [id, newComment]);

  return (
    <section className='head'>
      <div className='container'>
        <div className='row'>
          <div className='leftside'>
            <Filter className='filter' />
            <Chats className='chats' />
          </div>
          <div className='singlechat'>
            <SingleChat
              messagesList={messagesList}
              onSendMessage={onSendMessage}
              newComment={newComment}
              getListOfMessages={getListOfMessages}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
