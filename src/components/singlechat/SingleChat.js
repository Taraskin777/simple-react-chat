import React from "react";
import ChatOfSingleUser from "../chatOfSingleUser/ChatOfSingleUser";
import InputForSendMessage from "../inputForSendMessage/InputForSendMessage";
import { useEffect } from "react";
import "./singlechat.css";

const SingleChat = ({
  name,
  avatar,
  messagesList,
  onMessageValue,
  onSendMessage,
  newComment,
  getListOfMessage,
  scrollToBottom
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
      <div className="single-chat-wrapper" id="chatscroll">
        {messagesList.map(({ id, comment, date, chuck }) => (
          <div key={id}>
            <ChatOfSingleUser
              comment={comment}
              date={date}
              avatar={avatar}
              chuck={chuck}
              scrollToBottom={scrollToBottom}
            />
          </div>
        ))}
      </div>

      <InputForSendMessage
        onMessageValue={onMessageValue}
        onSendMessage={onSendMessage}
        newComment={newComment}
        getListOfMessage={getListOfMessage}
        scrollToBottom={scrollToBottom}
      />
    </div>
  );
};

export default SingleChat;
