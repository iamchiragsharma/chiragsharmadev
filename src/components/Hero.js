import React, { useEffect, useState } from 'react';
import './Hero.css';

const textArray = ["Software Developer.", "Magento 2 Specialist.", "Problem Solver."];

const Hero = () => {
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const type = () => {
      const current = textArray[textIndex];
      if (isDeleting) {
        setCurrentText(current.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setCurrentText(current.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }

      let speed = isDeleting ? 60 : 120;
      if (!isDeleting && charIndex === current.length) {
        speed = 2500;
        setIsDeleting(true);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % textArray.length);
        speed = 500;
      }
      setTimeout(type, speed);
    };

    const timer = setTimeout(type, 1200);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex]);

  return (
    <header id="hero" className="section">
      <div className="hero-content">
        <h2 className="greeting fade-up">Hello, world! I'm</h2>
        <h1 className="name fade-up">Chirag Sharma.</h1>
        <h2 className="role fade-up">
          <span className="typewriter">{currentText}</span>
          <span className="cursor">|</span>
        </h2>
        <p className="tagline fade-up">
          I engineer scalable e-commerce architectures and seamless digital experiences.
        </p>
        <div className="cta-group fade-up">
          <a href="#projects" className="btn btn-primary hover-target">View My Work</a>
          <a href="resume.pdf" download="Chirag_Sharma_Resume.pdf" className="btn btn-outline hover-target">Download Resume</a>
        </div>
      </div>
    </header>
  );
};

export default Hero;