import React from 'react';
import './Header.css';
import CameraIcon from './CameraIcon';

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
        <div className="header-title-container">
          <h1 className="header-title">{title}</h1>
          <p className="header-subtitle">from Fuji Weekly Recipes</p>
        </div>
        {!showBack && (
          <div className="header-logo">
            <span className="fuji-text">Fujifilm</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;