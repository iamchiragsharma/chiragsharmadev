import React from 'react';
import './TopBar.css';

const TopBar = () => {
  const tickerText = "OPEN TO WORK";
  const items = Array(15).fill(tickerText);

  return (
    <div className="top-bar">
      <div className="ticker-wrapper">
        <div className="ticker-content">
          {items.map((text, i) => (
            <span key={`a-${i}`} className="ticker-item">
              <span className="dot"></span> {text}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {items.map((text, i) => (
            <span key={`b-${i}`} className="ticker-item">
              <span className="dot"></span> {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
