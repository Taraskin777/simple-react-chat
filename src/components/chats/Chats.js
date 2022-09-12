import React from "react";
import { useState, useEffect } from "react";
import ChatPerson from "../chatPerson/ChatPerson";

import "./chats.css";

const commentsToAlice = "http://localhost:3001/messagesFromAlice";
const sortedUsers = "http://localhost:3001/users?_sort=date&_order=desc";
const jokes = "https://api.chucknorris.io/jokes/random";
const newComment = "new comment";


const addComment = (toUser) => {
  fetch(toUser, {
    method: "POST",
    body: JSON.stringify({
      comment: newComment,
      date: new Date()
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(`${data.comment} має id ${data.id} і відправлено ${data.date}`);
    });
};

const getUserList = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const chuckNorris = () => {
  fetch(jokes)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.value);
    });
};

const Chats = ({ filter, searchUsers }) => {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    getUserList(sortedUsers).then((data) => setUsersData(data));
  }, []);

  const filteredUsers = searchUsers(usersData, filter);

  return (
    <div className="chats-wrapper">
      <h2 className="chats">Chats</h2>
      <button onClick={() => console.log(usersData)} className="chats-btn">
        Users
      </button>
      <button onClick={() => console.log(filteredUsers)} className="chats-btn">
        Filtered
      </button>
      <button onClick={chuckNorris} className="chats-btn">
        Chuck
      </button>
      <button onClick={()=>addComment(commentsToAlice)} className="chats-btn">
        Comment
      </button>
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
              />
            </div>
          ))
        : null}
    </div>
  );
};

export default Chats;
