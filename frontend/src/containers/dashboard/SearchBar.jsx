import React, { useState } from "react";
import "./SearchBar-styles.scss";
import { sendErrorNotification } from "../../services/notifications";

const SearchBar = ({ setSearchText }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (event) => {
    const searchText = event.target.value;
    setSearchInput(searchText); // Update local state with the input value
    setSearchText(searchText); // Pass the search text to the parent component
    // window.alert("Go to Employees page to search for employees\nNeed some more time to make here functional");
    
  };
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    sendErrorNotification("Go to Employees page to search for employees. Need some more time to make here functional");
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
}


  return (
    <>
      <h2 className="section-heading">Search employees</h2>
      <div className="search-bar">
        <input
          type="text"
          value={searchInput}
          onChange={handleSearch} // Use the handleSearch function in onChange
          onKeyDown={handleKeyPress}
          placeholder="Search employees..."
        />
      </div>
    </>
  );
};

export default SearchBar;
