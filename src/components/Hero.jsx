import React, { useEffect, useState } from 'react';
import './Hero.css';

const textArray = ["Software Developer", "Adobe Commerce (Open Source) Specialist", "Problem Solver"];

const Hero = () => {
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const currentWord = textArray[textIndex];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        if (currentText.length <= 1) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % textArray.length);
        }
      }, 60);
    } else {
      if (currentText === currentWord) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2500);
      } else {
        timer = setTimeout(() => {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
        }, 120);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, textIndex]);

  return (
    <header id="hero" className="section">
      <div className="hero-content">
        <h2 className="greeting fade-up">Hello, world! I'm</h2>
        <h1 className="name fade-up">Chirag Sharma</h1>
        <h2 className="role fade-up">
          <span className="typewriter">{currentText}</span>
          <span className="cursor">|</span>
        </h2>
        <p className="tagline fade-up">
          I engineer scalable e-commerce architectures and seamless digital experiences.
        </p>
        <div className="cta-group fade-up">
          <a href="#projects" className="btn btn-primary hover-target">View My Work</a>
          <a href="/resume.pdf" download="Chirag_Sharma_Resume.pdf" className="btn btn-outline hover-target">Download Resume</a>
        </div>
      </div>
    </header>
  );
};

export default Hero;