import React from "react";
import PropTypes from "prop-types";

const ChatPerson = ({ id, name, date, avatar }) => {
  return (
    <div>
      <h3 className="name">{name}</h3>
      <div className="date">{date}</div>
      <div className="user-img">
        <img src="{avatar}" alt="avatar" />
      </div>
    </div>
  );
};

ChatPerson.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired
};

export default ChatPerson;
