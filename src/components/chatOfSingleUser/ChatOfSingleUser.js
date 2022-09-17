import React from "react";
import "./chatofsingleuser.css";

const ChatOfSingleUser = ({ comment, date, avatar }) => {

  
  
  return (
    <div className="single-chat">
      <div className="userphoto">
        <img src={avatar ? avatar : "/images/sergio.png"} alt="avatar" />
      </div>
      <div className="comment">{comment}</div>
      <div className="date">{date}</div>
    </div>
  );
};

export default ChatOfSingleUser;
