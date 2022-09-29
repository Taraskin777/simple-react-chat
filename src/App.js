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

import "./App.css";

function App() {
  const [filter, setFilter] = useState([]);
  const [name, setName] = useState("Sergio");
  const [avatar, setAvatar] = useState("/images/sergio.png");
  const [messagesList, setMessagesList] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [id, setId] = useState(2);
  const [commentId, setCommentId] = useState("");

  console.log(commentId);
  console.log(messagesList);

  const onFilterChange = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  const getUserData = (name, avatar, id) => {
    setName(name);
    setAvatar(avatar);
    setId(id);
    // scrollToBottom("chatscroll");
  };

  const scrollToBottom = (id) => {
    const element = document.getElementById(id);
    element.scrollTop = element.scrollHeight;
    console.log("scroll");
  };

  // const date = new Date();

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
  console.log(newUrl, newComment);

  // useEffect(() => {
  //   getListOfMessages(commentsToSergio).then((data) => setMessagesList(data));
  //   console.log("use effect");
  // }, [newUrl]);

  const onMessageValue = (e, newCommentId) => {
    setNewComment(e.target.value);
    setCommentId(newCommentId);
  };

  const chuck = true;

  let urlForPutLastMessage = "http://localhost:3001/users/" + id;
  console.log(urlForPutLastMessage);
  const onSendMessage = (e) => {
    e.preventDefault();
    addComment(newUrl, timeForSingleChat, newComment);
    changeLastMessage(
      urlForPutLastMessage,
      id,
      avatar,
      "/images/tick.png",
      timeForListOfUsers,
      newComment,
      name
    ).finally(() => {
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
      getListOfMessages(newUrl).then((data) => setMessagesList(data));
      setNewComment("");
    });
  };

  useEffect(() => {
    getListOfMessages(newUrl).then((data) => setMessagesList(data));
  }, [newUrl, newComment]);

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
              newComment={newComment}
              commentId={commentId}
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
