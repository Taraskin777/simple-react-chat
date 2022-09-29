import React from "react";
import { useState, useEffect } from "react";
import ChatPerson from "../chatPerson/ChatPerson";
// import App from "../../App";
import { sortedUsers, getUserList } from "../../services/httpservices";

import "./chats.css";

const Chats = ({ filter, searchUsers, getUserData, newComment }) => {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    getUserList(sortedUsers).then((data) => setUsersData(data));
  }, [newComment]);

  const filteredUsers = searchUsers(usersData, filter);

  return (
    <div className="chats-wrapper">
      <h2 className="chats">Chats</h2>

      {filteredUsers.length
        ? filteredUsers.map(({ id, date, name, avatar, message, tick }) => (
            <div key={id}>
              <ChatPerson
                id={id}
                name={name}
                date={date}
                avatar={avatar}
                message={message}
                tick={tick}
                getUserData={getUserData}
                filteredUsers={filteredUsers}
              />
            </div>
          ))
        : null}
    </div>
  );
};

export default Chats;
