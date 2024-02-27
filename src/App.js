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
import { setNewComment, setSearchName } from "./store/userDataSlice";


import "./App.css";

function App() {
  const [searchName, setSearchName] = useState("");
  const [name, setName] = useState("Sergio");
  const [avatar, setAvatar] = useState("/images/sergio.png");
  const [messagesList, setMessagesList] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [id, setId] = useState(2);

  const chuck = useSelector((state) => state.data.chuck);
  // const dispatch = useDispatch();

  const users = process.env.REACT_APP_USERS;
  const messageFromUser = process.env.REACT_APP_MESSAGES_FROM_USER;
  const addMessage = process.env.REACT_APP_MESSAGES;

  console.count("app render");

  const onFilterChange = (e) => {
    setSearchName(e.target.value.toLowerCase());
    // dispatch(setSearchName(e.target.value.toLowerCase()));
  };

  const getUserData = (name, avatar, id) => {
    setName(name);
    setAvatar(avatar);
    setId(id);
  };

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

  const onMessageValue = (e) => {
    setNewComment(e.target.value);
    // dispatch(setNewComment(e.target.value));
  };

  const urlForPutLastMessage = `${users}/${id}`;

  // const onSendMessage = (e) => {
  //   e.preventDefault();
  //   addComment(addMessage, timeForSingleChat, newComment, !chuck, id);
  //   changeLastMessage(
  //     urlForPutLastMessage,
  //     id,
  //     avatar,
  //     timeForListOfUsers,
  //     newComment,
  //     name
  //   ).then(() => {
  //     const chuckTimer = setTimeout(() => {
  //       chuckNorris().then((data) => {
  //         addComment(addMessage, timeForSingleChat, data.value, chuck, id);
  //         setMessagesList((prevdata) => [
  //           ...prevdata,
  //           {
  //             comment: data.value,
  //             date: timeForSingleChat,
  //             chuck: chuck,
  //             id: data.id,
  //             userId: id,
  //           },
  //         ]);
  //       });
  //       return () => clearInterval(chuckTimer);
  //     }, 3000);
  //     getListOfMessages(`${messageFromUser}${id}`).then((data) =>
  //       setMessagesList(data)
  //     );
  //     setNewComment("");
  //   });
  // };

  const onSendMessage = async (e) => {
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
      setNewComment("");
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
            <Filter
              className="filter"
              filter={searchName}
              onFilterChange={onFilterChange}
            />
            <Chats
              className="chats"
              searchName={searchName}
              searchUsers={searchUsers}
              time={timeForListOfUsers}
              getUserData={getUserData}
              newComment={newComment}
            />
          </div>
          <div className="singlechat">
            <SingleChat
              name={name}
              avatar={avatar}
              messagesList={messagesList}
              onMessageValue={onMessageValue}
              onSendMessage={onSendMessage}
              newComment={newComment}
              getListOfMessages={getListOfMessages}
              scrollToBottom={scrollToBottom}
              id={id}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
