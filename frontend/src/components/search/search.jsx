import "./search.css";
import { Input } from "antd";
import React, { useState } from "react";

const { Search } = Input;

const SearchBar = ({ input, onSearch, resetSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const onSearchChange = (value) => {
    if (value === "") {
      resetSearch();
    } else {
      const query = value.toLowerCase();
      const results = query
        ? input.filter((user) => {
            return Object.values(user || {}).some(
              (field) =>
                field &&
                typeof field === "string" &&
                field.toLowerCase().includes(query)
            );
          })
        : input;
      onSearch(results);
    }
  };

  return (
    <div className="search_container">
      <Search
        className="search_bar"
        placeholder="Type to search..."
        size="large"
        allowClear={true}
        onChange={(e) => {
          const value = e.target.value;
          setSearchQuery(value);
          onSearchChange(value);
        }}
        value={searchQuery}
        onSearch={onSearchChange}
      />
    </div>
  );
};

export default SearchBar;
