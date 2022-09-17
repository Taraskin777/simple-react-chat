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

const SingleChat = ({
  newUrl,
  name,
  avatar,
  time,
  messagesList,
  setMessagesList,
}) => {
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
            <ChatOfSingleUser
              comment={comment}
              date={date}
              avatar={avatar}
              time={time}
            />
          </div>
        ))}
      </div>

      <InputForSendMessage
        time={time}
        newUrl={newUrl}
        setMessagesList={setMessagesList}
      />
    </div>
  );
};

export default SingleChat;
