import React from "react";
import { useState, useEffect } from "react";
import Filter from "./components/filter/Filter";
import Chats from "./components/chats/Chats";
import SingleChat from "./components/singlechat/SingleChat";
import {
  commentsToAlice,
  commentsToSergio,
  commentsToBarrera,
  commentsToVelasqez,
  commentsToMia,
  getListOfMessages,
  addComment,
  chuckNorris,
  changeLastMessage,
} from "./services/httpservices";
import { useSelector } from "react-redux";
import { data } from "./store/userDataSlice";

import "./App.css";

function App() {
  const [searchName, setSearchName] = useState("");
  const [name, setName] = useState("Sergio");
  const [avatar, setAvatar] = useState("/images/sergio.png");
  const [messagesList, setMessagesList] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [id, setId] = useState(2);

  const { chuck } = useSelector(data);

  const users = process.env.REACT_APP_USERS;

  console.count("app render");

  const onFilterChange = (e) => {
    setSearchName(e.target.value.toLowerCase());
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

  const onChooseUser = (url) => {
    switch (name) {
      case "Alice Freeman":
        url = commentsToAlice;
        break;
      case "Sergio":
        url = commentsToSergio;
        break;
      case "Velasqez":
        url = commentsToVelasqez;
        break;
      case "Barrera":
        url = commentsToBarrera;
        break;
      case "Mia":
        url = commentsToMia;
        break;
      default:
        url = commentsToSergio;
    }
    return url;
  };

  const newUrl = onChooseUser();
  console.log(newUrl, newComment);

  // useEffect(() => {
  //   getListOfMessages(commentsToSergio).then((data) => setMessagesList(data));
  //   console.log("use effect");
  // }, [newUrl]);

  const onMessageValue = (e) => {
    setNewComment(e.target.value);
  };

  // const chuck = true;

  const urlForPutLastMessage = users + id;

  console.log(urlForPutLastMessage);

  const onSendMessage = (e) => {
    e.preventDefault();
    addComment(newUrl, timeForListOfUsers, newComment);
    changeLastMessage(
      urlForPutLastMessage,
      id,
      avatar,
      // "/images/tick.png",
      timeForListOfUsers,
      newComment,
      name
    ).then(() => {
      const chuckTimer = setTimeout(() => {
        chuckNorris().then((data) => {
          addComment(newUrl, timeForSingleChat, data.value, chuck);
          setMessagesList((prevdata) => [
            ...prevdata,
            {
              comment: data.value,
              date: timeForSingleChat,
              chuck: chuck,
              id: data.id,
            },
          ]);
        });
        return clearInterval(chuckTimer);
      }, 3000);
      getListOfMessages(newUrl).then((data) => setMessagesList(data));
      setNewComment("");
    });
  };

  useEffect(() => {
    getListOfMessages(newUrl)
      .then((data) => setMessagesList(data))
      .catch((error) => console.log(error));
  }, [newUrl, newComment]);

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
