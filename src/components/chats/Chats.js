import React from "react";
import { useState, useEffect } from "react";
import ChatPerson from "../chatPerson/ChatPerson";

import "./chats.css";

// const addComment = async (url, data) => {
//   const res = await fetch(url, {
//     method: "POST",
//     body: data,
//     headers: {
//       "Content-type": "application/json",
//     },
//   });
//   return await res.json();
// };

// addComment("http://localhost:3001/comments", JSON.stringify({
//   new comment: "sdfdsvsv"
// }));

//  імпортуєш useState i useEffect для того щоб код
// виконати тільки при завантаженні компонента

// const someComponent = () => {
// Створюєш стейт з порожнім массивом за умовчуванням
// const [userData, setUserData] = sueState([]);
// Передаєш useEffect колбек, який потрібно викликати і
// другим аргументом порожній массив щоб код виконався
// Тільки при завантаженні компонента
// useEffect(() => {
// Виклич свою функуцію
// getUserList()
// В блоці then засеть дані в стейт
//         .then(data => setUesrData(data))
//     }, []);
//     return (
//     <>
//         <h1>Використай свої ... дані</h1>
//         {userData.length ? userData.map(element => <ChatPerson id={element.id} name={element.name} date={element.date} avatar={element.avatar} />) : null}
//     </>
//     )
// }

const addComment = () => {
  fetch("http://localhost:3001/comments", {
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

// const getUsersList = () => {
//   fetch("http://localhost:3001/users")
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//     });
// };

const chuckNorris = () => {
  fetch("https://api.chucknorris.io/jokes/random")
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
    getUserList("http://localhost:3001/users").then((data) =>
      setUsersData(data)
    );
  }, []);

  // console.log(usersData);

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
      <div>
        {usersData.length
          ? usersData.map(({ id, date, name, avatar }) => (
              <ChatPerson key={id} id = {id} name={name} date={date} avatar={avatar} />
            ))
          : null}
      </div>
    </>
  );
};

export default Chats;
