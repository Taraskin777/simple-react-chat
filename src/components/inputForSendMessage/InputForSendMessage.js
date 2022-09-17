import React from "react";
import {
  addComment,
  getListOfMessages,
  chuckNorris,
  commentsToSergio,
} from "../../services/httpservices";
import "./inputforsendmessage.css";

const InputForSendMessage = ({ time, newUrl }) => {
 
  
  const onSendMessage = (e) => {
    e.preventDefault();
    console.log("message sent");
    addComment(newUrl, time);
    setTimeout(() => {
      chuckNorris().then((data) => console.log(data.value));
    }, 3000);
  };

  return (
    <>
      <div className="input-for-message">
        <form className="form" onSubmit={onSendMessage}>
          <input type="text" placeholder="Type your message" />
          <button className="sendmessage" type="submit"></button>
        </form>
      </div>
    </>
  );
};

export default InputForSendMessage;
