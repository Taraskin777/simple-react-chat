/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import "./chatofsingleuser.css";

const ChatOfSingleUser = ({ comment, date, avatar, chuck }) => {
  const styleForChuck = {
    backgroundColor: "#696969",
    color: "white",
  };

  const scrollToBottom = (id) => {
    const element = document.getElementById(id);
    element.scrollTop = element.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom("chatscroll");
  }, [comment]);



  // console.log("ChatOfSingleUser render");

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
            style={!chuck ? { display: "block" } : { display: "none" }}
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
