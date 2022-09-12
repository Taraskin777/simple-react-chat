import React from "react";
import { useState } from "react";
import "./App.css";
import Filter from "./components/filter/Filter";
import Chats from "./components/chats/Chats";
import SingleChat from "./components/singlechat/SingleChat";

function App() {
  const [filter, setFilter] = useState([]);

  const onFilterChange = (e) => {
    setFilter(e.target.value.toLowerCase());
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

  return (
    <div className="container">
      <div className="row">
        <div className="leftside">
          <Filter
            className="filter"
            filter={filter}
            onFilterChange={onFilterChange}
          />
          <Chats className="chats" filter={filter} searchUsers={searchUsers} time={time}/>
        </div>
        <div className="singlechat">
          <SingleChat />
        </div>
      </div>
    </div>
  );
}

export default App;

