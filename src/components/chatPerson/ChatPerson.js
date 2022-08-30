import React from "react";

const ChatPerson = ({ id, name, date, avatar }) => {
  return (
    <div>
      <h3>{name}</h3>
      <div>{date}</div>
      <div>{avatar}</div>
    </div>
  );
};

export default ChatPerson;
