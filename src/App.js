import React from "react";
import "./App.css";
import Filter from "./components/filter/Filter";
import Chats from "./components/chats/Chats";
import SingleChat from "./components/singlechat/SingleChat";

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="leftside">
          <Filter className="filter" />
          <Chats className="chats" />
        </div>
        <div className="singlechat">
          <SingleChat />
        </div>
      </div>
    </div>
  );
}

export default App;
