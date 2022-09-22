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
} from "./services/httpservices";

import "./App.css";

function App() {
  const [filter, setFilter] = useState([]);
  const [name, setName] = useState();
  const [avatar, setAvatar] = useState();
  const [messagesList, setMessagesList] = useState([]);
  const [newComment, setNewComment] = useState();



  const onFilterChange = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  const getUserData = (name, avatar) => {
    setName(name);
    setAvatar(avatar);
  };

  const date = new Date();

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

  console.log(`Зараз у Львові ${timeForSingleChat}`);

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
 

  useEffect(() => {
    getListOfMessages(commentsToSergio).then((data) => setMessagesList(data));
  }, [newUrl]);

  const onMessageValue = (e) => {
    setNewComment(e.target.value);
    console.log(newComment);
  };

  const chuck = true;

  const onSendMessage = (e) => {
    e.preventDefault();
    addComment(newUrl, timeForSingleChat, newComment);
    setNewComment("");
    getListOfMessages(newUrl).then((data) => setMessagesList(data));
    setTimeout(() => {
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
    }, 3000);
  };

  useEffect(() => {
    getListOfMessages(newUrl).then((data) => setMessagesList(data));
  }, [name, newComment]);

  return (
    <section className="head">
      <div className="container">
        <div className="row">
          <div className="leftside">
            <Filter
              className="filter"
              filter={filter}
              onFilterChange={onFilterChange}
            />
            <Chats
              className="chats"
              filter={filter}
              searchUsers={searchUsers}
              time={timeForListOfUsers}
              getUserData={getUserData}
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
              chuck={chuck}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
