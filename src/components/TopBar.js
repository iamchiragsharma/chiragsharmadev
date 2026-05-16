import React, { useRef, useEffect } from 'react';
import './TopBar.css';

const TopBar = () => {
  const tickerText = "OPEN TO WORK";
  const items = Array(15).fill(tickerText);
  const tickerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!tickerRef.current) return;
    
    const keyframes = [
      { transform: 'translateX(0)' },
      { transform: 'translateX(-50%)' }
    ];
    
    const options = {
      duration: 25000, // Faster than previous 60s
      iterations: Infinity,
      easing: 'linear'
    };
    
    animationRef.current = tickerRef.current.animate(keyframes, options);
    
    return () => {
      if (animationRef.current) animationRef.current.cancel();
    };
  }, []);

  const smoothRateChange = (targetRate, duration) => {
    if (!animationRef.current) return;
    const anim = animationRef.current;
    
    // Prevent playbackRate from being exactly 0 to avoid browser engine jump bugs
    const safeTarget = targetRate === 0 ? 0.000001 : targetRate;
    const initialRate = anim.playbackRate;
    let start;

    cancelAnimationFrame(anim.rafId);

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      
      // Use linear deceleration (constant friction) for smoother visual stop
      anim.playbackRate = initialRate + (safeTarget - initialRate) * progress;
      
      if (progress < 1) {
        anim.rafId = requestAnimationFrame(step);
      }
    };
    anim.rafId = requestAnimationFrame(step);
  };

  return (
    <div 
      className="top-bar"
      onMouseEnter={() => smoothRateChange(0, 600)}
      onMouseLeave={() => smoothRateChange(1, 600)}
    >
      <div className="ticker-wrapper">
        <div className="ticker-content" ref={tickerRef}>
          {items.map((text, i) => (
            <span key={`a-${i}`} className="ticker-item">
              <span className="dot"></span> {text}
            </span>
          ))}
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
