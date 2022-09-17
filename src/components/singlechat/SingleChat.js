import React from "react";
import ChatOfSingleUser from "../chatOfSingleUser/ChatOfSingleUser";
import InputForSendMessage from "../inputForSendMessage/InputForSendMessage";
import {
  commentsToSergio,
  getListOfMessages,
  sortedUsers,
} from "../../services/httpservices";
import { useState, useEffect } from "react";
import "./singlechat.css";

const SingleChat = ({ newUrl, name, avatar }) => {
  const [messagesList, setMessagesList] = useState([]);

  useEffect(() => {
    getListOfMessages(commentsToSergio).then((data) => setMessagesList(data));
  }, [newUrl]);

  useEffect(() => {
    getListOfMessages(newUrl).then((data) => setMessagesList(data));
  }, [newUrl]);



  return (
    <div className="chat">
      <div className="userinfo">
        <div className="user-avatar">
          <img src={avatar ? avatar : "/images/sergio.png"} alt="avatar" />
          <div className="user-tick">
            <img src="/images/tick.png" alt="tick" />
          </div>
        </div>
        <h2>{name ? name : "Sergio"}</h2>
      </div>
      <div className="single-chat-wrapper">
        {messagesList.map(({ id, comment, date }) => (
          <div key={id}>
            <ChatOfSingleUser comment={comment} date={date} avatar={avatar} />
          </div>
        ))}
      </div>

      <InputForSendMessage />
    </div>
  );
};

export default SingleChat;
