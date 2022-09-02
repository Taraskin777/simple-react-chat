import React from "react";
import { useState, useEffect } from "react";
import ChatPerson from "../chatPerson/ChatPerson";

import "./chats.css";

const comments = "http://localhost:3001/comments";
const users = "http://localhost:3001/users";
const jokes = "http://localhost:3001/jokes";

const addComment = () => {
  fetch(comments, {
    method: "POST",
    body: JSON.stringify({
      comment: "new-comment",
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(`${data.comment} має id ${data.id}`);
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

const Chats = () => {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    getUserList(users).then((data) =>
      setUsersData(data)
    );
  }, []);



  return (
    <>
      <h2>Chats</h2>
      <button onClick={() => console.log(usersData)} className="chats-btn">
        Users
      </button>
      <button onClick={chuckNorris} className="chats-btn">
        Chuck
      </button>
      <button onClick={addComment} className="chats-btn">
        Comment
      </button>
      {usersData.length
        ? usersData.map(({ id, date, name, avatar }) => (
            <div key={id}>
              <ChatPerson id={id} name={name} date={date} avatar={avatar} />
            </div>
          ))
        : null}
    </>
  );
};

export default Chats;

