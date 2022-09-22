import React from "react";
import ChatOfSingleUser from "../chatOfSingleUser/ChatOfSingleUser";
import InputForSendMessage from "../inputForSendMessage/InputForSendMessage";

import "./singlechat.css";

const SingleChat = ({
  name,
  avatar,
  messagesList,
  onMessageValue,
  onSendMessage,
  newComment,
  getListOfMessage,
  chuck,
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
        {messagesList.map(({ id, comment, date, chuck }) => (
          <div key={id}>
            <ChatOfSingleUser
              comment={comment}
              date={date}
              avatar={avatar}
              chuck={chuck}
            />
          </div>
        ))}
      </div>

      <InputForSendMessage
        onMessageValue={onMessageValue}
        onSendMessage={onSendMessage}
        newComment={newComment}
        getListOfMessage={getListOfMessage}
      />
    </div>
  );
};

export default SingleChat;
