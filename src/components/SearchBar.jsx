import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchTerm, onSearch, placeholder }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  const handleClear = () => {
    onSearch('');
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
          <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleChange}
        />
        {searchTerm && (
          <button className="clear-btn" onClick={handleClear}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;