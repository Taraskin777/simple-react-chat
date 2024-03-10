import React from 'react';
import Filter from './components/filter/Filter';
import Chats from './components/chats/Chats';
import SingleChat from './components/singlechat/SingleChat';

import { db } from './components/utils/firebase';
import { equalTo, onValue, orderByChild, ref, query } from 'firebase/database';

import './App.css';

function App() {
  // const { id } = useSelector((state) => state.data);

  // const dispatch = useDispatch();

  // const users = process.env.REACT_APP_USERS;
  // const messageFromUser = process.env.REACT_APP_MESSAGES_FROM_USER;
  // const addMessage = process.env.REACT_APP_MESSAGES;

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

  return (
    <section className='head'>
      <div className='container'>
        <div className='row'>
          <div className='leftside'>
            <Filter className='filter' />
            <Chats className='chats' />
          </div>
          <div className='singlechat'>
            <SingleChat />
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
