import React, { useState } from "react";
import "./SearchBar-styles.scss";

const SearchBar = ({ setSearchText }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (event) => {
    const searchText = event.target.value;
    setSearchInput(searchText); // Update local state with the input value
    setSearchText(searchText); // Pass the search text to the parent component
  };


  return (
    <>
      <h2 className="section-heading">Search employees</h2>
      <div className="search-bar">
        <input
          type="text"
          value={searchInput}
          onChange={handleSearch} // Use the handleSearch function in onChange
          
          placeholder="Search employees..."
        />
      </div>
    </>
  );
};

export default SearchBar;
