import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { setSearchName } from "../../store/userDataSlice";

import "./filter.css";

const Filter = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.data.searchName);

  console.log(searchValue);
  const onFilterChange = (e) => {
    dispatch(setSearchName(e.target.value.toLowerCase()));
  };

  return (
    <div className="main">
      <div className="useravatar">
        <div className="tick"></div>
      </div>
      <div className="search">
        <div className="search-icon"></div>
        <input
          onChange={onFilterChange}
          value={searchValue}
          type="search"
          placeholder="Search or start a new chat"
          className="search-input"
        />
      </div>
    </div>
  );
};

export default Filter;
