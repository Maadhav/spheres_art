import React from "react";
import "./Search.css";
import { Search as Icon } from "react-iconly";

const Search = () => {
  return (
    <div className="search-container">
      <Icon className="search-icon" />
      <input className="search-input" placeholder="Search Item Here" />
    </div>
  );
};

export default Search;
