import React from "react";
import ChatOfSingleUser from "../chatOfSingleUser/ChatOfSingleUser";
import InputForSendMessage from "../inputForSendMessage/InputForSendMessage";
import "./singlechat.css";

const SingleChat = () => {
  return (
    <div className="chat">
      <div className="nameofuser">
        <h2>Josefina</h2>
      </div>
      <ChatOfSingleUser />
      <InputForSendMessage />
    </div>
  );
};

export default SingleChat;
