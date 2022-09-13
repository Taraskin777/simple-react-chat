import React from "react";
import { useState, useEffect } from "react";
import Filter from "./components/filter/Filter";
import Chats from "./components/chats/Chats";
import SingleChat from "./components/singlechat/SingleChat";
import {
  commentsToAlice,
  commentsToSergio,
  commentsToBarrera,
  commentsToVelasqez,
  getListOfMessages,
} from "./services/httpservices";

import "./App.css";

function App() {
  const [filter, setFilter] = useState([]);
  const [name, setName] = useState();

  const onFilterChange = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  const getUserName = (name) => {
    setName(name);
  };

  const fullDate = new Date();
  const fullYear = fullDate.getFullYear();
  const month = fullDate.getMonth();
  const day = fullDate.getDate();
  const dayOfWeek = fullDate.getDay();
  const time = fullDate.toLocaleTimeString().slice(0, -3);
  const hours = fullDate.getHours();
  const minutes = fullDate.getMinutes();

  const convertDay = (day) => {
    switch (day) {
      case 0:
        day = "Sun";
        break;
      case 1:
        day = "Mon";
        break;
      case 2:
        day = "Tue";
        break;
      case 3:
        day = "Wed";
        break;
      case 4:
        day = "Thu";
        break;
      case 5:
        day = "Fri";
        break;
      case 6:
        day = "Sat";
        break;
      default:
        day = "Щось не так!";
    }

    return day;
  };

  const convertedDayOfWeek = convertDay(dayOfWeek);

  console.log(
    `Зараз ${fullYear} рік, ${month} місяць і ${day} число. День тижня - ${convertedDayOfWeek}. Час у Львові - ${time}`
  );

  const searchUsers = (users, filter) => {
    if (filter.length === 0) {
      return users;
    }
    return users.filter((user) => {
      return user.name.toLowerCase().indexOf(filter) > -1;
    });
  };

  const onChooseUser = (url) => {
    switch (name) {
      case "Alice Freeman":
        url = commentsToAlice;
        break;
      case "Sergio":
        url = commentsToSergio;
        break;
      case "Velasqez":
        url = commentsToVelasqez;
        break;
      case "Barrera":
        url = commentsToBarrera;
        break;
      default:
        url = "";
    }
    return url;
  };

  const newUrl = onChooseUser();

  return (
    <section className="head">
      <div className="container">
        <div className="row">
          <div className="leftside">
            <Filter
              className="filter"
              filter={filter}
              onFilterChange={onFilterChange}
            />
            <Chats
              className="chats"
              filter={filter}
              searchUsers={searchUsers}
              time={time}
              getUserName={getUserName}
            />
          </div>
          <div className="singlechat">
            <SingleChat newUrl={newUrl} name={name} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
