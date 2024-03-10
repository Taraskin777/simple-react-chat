import React from 'react';
import { useState, useEffect } from 'react';
import ChatPerson from '../chatPerson/ChatPerson';

import { sortedUsers, getUserList } from '../../services/httpservices';
import { useSelector } from 'react-redux';

import './chats.css';

const Chats = () => {
  const [usersData, setUsersData] = useState([]);

  const {searchName, newComment} = useSelector((state) => state.data);

  const searchUsers = (users, filter) => {
    if (filter.length === 0) {
      return users;
    }
    return users.filter((user) => {
      return user.name.toLowerCase().indexOf(filter) > -1;
    });
  };

  useEffect(() => {
    getUserList(sortedUsers).then((data) => setUsersData(data));
  }, [newComment]);

  const filteredUsers = searchUsers(usersData, searchName);

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
                filteredUsers={filteredUsers}
              />
            </div>
          ))
        : null}
    </div>
  );
};

export default Chats;
