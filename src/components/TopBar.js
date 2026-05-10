import React from 'react';
import './TopBar.css';

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="ticker-wrapper">
        <div className="ticker-content">
          {[...Array(20)].map((_, i) => (
            <span key={i} className="ticker-item">
              <span className="dot"></span> OPEN TO WORK
            </span>
          ))}
        </div>
        <div className="ticker-content">
          {[...Array(20)].map((_, i) => (
            <span key={i} className="ticker-item">
              <span className="dot"></span> OPEN TO WORK
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
