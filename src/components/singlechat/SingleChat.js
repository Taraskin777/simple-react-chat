import React from "react";
import ChatOfSingleUser from "../chatOfSingleUser/ChatOfSingleUser";
import InputForSendMessage from "../inputForSendMessage/InputForSendMessage";
import "./singlechat.css";
import { useSelector } from "react-redux";

const SingleChat = ({
  messagesList,
  onSendMessage,
  newComment,
  scrollToBottom,
}) => {
  const { name, avatar, id } = useSelector((state) => state.data);

  const messageFromUser = process.env.REACT_APP_MESSAGES_FROM_USER;
  
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
              scrollToBottom={scrollToBottom}
              chuck={chuck}
            />
          </div>
        ))}
      </div>
      <InputForSendMessage
        onSendMessage={onSendMessage}
        newComment={newComment}
        scrollToBottom={scrollToBottom}
        id={id}
      />
    </div>
  );
};

export default SingleChat;
