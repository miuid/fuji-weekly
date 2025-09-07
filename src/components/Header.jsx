import React from 'react';
import './Header.css';

const Header = ({ title, showBack, onBack }) => {
  return (
    <header className="header">
      <div className="header-content">
        {showBack && (
          <button className="header-back-btn" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        <h1 className="header-title">{title}</h1>
        {!showBack && (
          <div className="header-logo">
            <img src="/logo.png" alt="FujiX" onError={(e) => e.target.style.display = 'none'} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;