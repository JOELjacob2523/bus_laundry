import "./search.css";
import { Input } from "antd";
import React, { useEffect, useState } from "react";

const { Search } = Input;

const SearchBar = ({ input, onSearch, resetSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Search the input
  useEffect(() => {
    if (searchQuery.trim() === "") {
      resetSearch(); // Reset the search when input is cleared
    } else {
      const query = searchQuery.toLowerCase();
      const results = input.filter((user) =>
        Object.values(user || {}).some(
          (field) =>
            field &&
            typeof field === "string" &&
            field.toLowerCase().includes(query)
        )
      );
      onSearch(results);
    }
  }, [searchQuery, input]);

  return (
    <div className="search_container">
      <Search
        className="search_bar"
        placeholder="Type to search..."
        size="large"
        allowClear={true}
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
      />
    </div>
  );
};

export default SearchBar;
