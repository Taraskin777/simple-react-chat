import React from "react";
import ChatOfSingleUser from "../chatOfSingleUser/ChatOfSingleUser";
import InputForSendMessage from "../inputForSendMessage/InputForSendMessage";
import { getListOfMessages } from "../../services/httpservices";
import { useState, useEffect } from "react";
import "./singlechat.css";

const SingleChat = ({ newUrl, name }) => {

  const [messagesList, setMessagesList] = useState([]);

  useEffect(() => {
    getListOfMessages(newUrl).then((data) => setMessagesList(data));
  }, [newUrl]);

  console.log(newUrl);
  console.log(messagesList);

  return (
    <div className="chat">
      <div className="nameofuser">
        <h2>{name}</h2>
      </div>
      <ChatOfSingleUser />
      <InputForSendMessage />
    </div>
  );
};

export default SingleChat;
