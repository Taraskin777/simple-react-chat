import React from "react";
import "./filter.css";

const Filter = () => {



  return (
    <div className="main">
      <div className="useravatar">
        <div className="tick"></div>
      </div>
      <div className="search">
       <div className="search-icon"></div>
        <input
          type="search"
          placeholder="Search or start a new chat"
          className="search-input"
        />
      </div>
    </div>
  );
};

export default Filter;
