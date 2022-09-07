import React from "react";
import PropTypes from "prop-types";
import "./chatperson.css";

const ChatPerson = ({ id, name, date, avatar, tick, message }) => {
  return (
    <div className="chatperson" onClick={()=>console.log("click")}>
      <div className="user-img">
        <div className="avatar">
          <img src={avatar} alt="avatar"/>
        </div>
        <div className="avatar-tick">
          <img src={tick} alt="tick"/>
        </div>
      </div>
      <div className="person-ifo">
        <h3 className="name">{name}</h3>
        <div className="message">{message}</div>
      </div>
      <div className="date">{date}</div>
    </div>
  );
};

ChatPerson.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  message: PropTypes.string,
  tick: PropTypes.string,
};

export default ChatPerson;
