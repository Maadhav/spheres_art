import React from "react";
import "./Search.css";
import { Search as Icon } from "react-iconly";

const Search = ({onClick, onChange}) => {
  return (
    <div className="search-container">
      <Icon className="search-icon" />
      <input className="search-input" placeholder="Search Item Here" onClick={onClick} onChange={onChange} id={'search'}/>
    </div>
  );
};

export default Search;
