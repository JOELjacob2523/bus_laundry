import "./search.css";
import { Input } from "antd";
import React, { useState } from "react";

const { Search } = Input;

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const onSearch = (value) => {
    // Do something with the search query
    console.log("Searched", value);
  };
  return (
    <div className="search_container">
      <Search
        className="search_bar"
        placeholder="Search..."
        value={searchQuery}
        size="large"
        allowClear={true}
        onChange={(e) => setSearchQuery(e.target.value)}
        onSearch={onSearch}
      />
    </div>
  );
};

export default SearchBar;
