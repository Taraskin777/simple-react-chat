import React from "react";
import { useState } from "react";
import "./App.css";
import Filter from "./components/filter/Filter";
import Chats from "./components/chats/Chats";
import SingleChat from "./components/singlechat/SingleChat";

function App() {
  const [filter, setFilter] = useState([]);

  const onFilterChange = (e) => {
    setFilter(e.target.value);
  };

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
          <Chats className="chats" filter={filter} searchUsers={searchUsers} />
        </div>
        <div className="singlechat">
          <SingleChat />
        </div>
      </div>
    </div>
  );
}

export default App;
