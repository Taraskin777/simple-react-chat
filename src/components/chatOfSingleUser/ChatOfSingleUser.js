import React from "react";
import { useEffect } from "react";
import "./chatofsingleuser.css";

const ChatOfSingleUser = ({ comment, date, avatar, chuck, scrollToBottom }) => {
  
  const styleForChuck = {
    backgroundColor: "#696969",
    color: "white",
  };

  scrollToBottom("chatscroll");

  return (
    <>
      <div
        id="chatscroll"
        className="single-chat"
        style={chuck ? { justifyContent: "flex-end" } : null}
      >
        <div>
          <div
            className="userphoto"
            style={chuck ? { display: "none" } : { display: "block" }}
          >
            <img src={avatar ? avatar : "/images/sergio.png"} alt="avatar" />
          </div>
        </div>

        <div>
          <div className="comment" style={chuck ? styleForChuck : null}>
            {comment}
          </div>
          <div
            className="date"
            style={chuck ? { textAlign: "end" } : { textAlign: "start" }}
          >
            {date}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatOfSingleUser;
