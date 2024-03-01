import React from "react";
import { useState, useEffect } from "react";
import Filter from "./components/filter/Filter";
import Chats from "./components/chats/Chats";
import SingleChat from "./components/singlechat/SingleChat";
import {
  getListOfMessages,
  addComment,
  chuckNorris,
  changeLastMessage,
} from "./services/httpservices";
import { useSelector, useDispatch } from "react-redux";
import { setNewComment } from "./store/userDataSlice";

import { db } from "./components/utils/firebase";
import { equalTo, onValue, orderByChild, ref, query } from "firebase/database";

import "./App.css";

function App() {
  const [messagesList, setMessagesList] = useState([]);

  const { chuck, newComment, name, id, avatar } = useSelector(
    (state) => state.data
  );

  const dispatch = useDispatch();

  const users = process.env.REACT_APP_USERS;
  const messageFromUser = process.env.REACT_APP_MESSAGES_FROM_USER;
  const addMessage = process.env.REACT_APP_MESSAGES;

  console.count("app render");

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

  const scrollToBottom = (id) => {
    const element = document.getElementById(id);
    element.scrollTop = element.scrollHeight;
    console.log("scroll");
  };

  const options1 = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const timeForListOfUsers = new Intl.DateTimeFormat(
    "en-US",
    options1
  ).format();

  const options2 = {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const timeForSingleChat = new Intl.DateTimeFormat("en-US", options2).format();

  const searchUsers = (users, filter) => {
    if (filter.length === 0) {
      return users;
    }
    return users.filter((user) => {
      return user.name.toLowerCase().indexOf(filter) > -1;
    });
  };

  const onSendMessage = async (e) => {
    const urlForPutLastMessage = `${users}/${id}`;
    e.preventDefault();
    try {
      addComment(addMessage, timeForSingleChat, newComment, !chuck, id);
      await changeLastMessage(
        urlForPutLastMessage,
        id,
        avatar,
        timeForListOfUsers,
        newComment,
        name
      );

      const chuckTimer = setTimeout(async () => {
        try {
          const data = await chuckNorris();
          addComment(addMessage, timeForSingleChat, data.value, chuck, id);
          setMessagesList((prevdata) => [
            ...prevdata,
            {
              comment: data.value,
              date: timeForSingleChat,
              chuck: chuck,
              id: data.id,
              userId: id,
            },
          ]);
        } catch (error) {
          console.error("Error fetching Chuck Norris data:", error);
        } finally {
          return () => clearTimeout(chuckTimer);
        }
      }, 3000);

      const data = await getListOfMessages(`${messageFromUser}${id}`);
      setMessagesList(data);
      dispatch(setNewComment(""));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getListOfMessages(`${messageFromUser}${id}`)
      .then((data) => setMessagesList(data))
      .catch((error) => console.log(error));
  }, [id, newComment]);

  return (
    <section className="head">
      <div className="container">
        <div className="row">
          <div className="leftside">
            <Filter className="filter" />
            <Chats
              className="chats"
              searchUsers={searchUsers}
              time={timeForListOfUsers}
              newComment={newComment}
            />
          </div>
          <div className="singlechat">
            <SingleChat
              messagesList={messagesList}
              onSendMessage={onSendMessage}
              newComment={newComment}
              getListOfMessages={getListOfMessages}
              scrollToBottom={scrollToBottom}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
