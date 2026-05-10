import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isHomePage = location.pathname === '/';

  const NavLink = ({ to, children, id }) => {
    if (isHomePage) {
      return (
        <li>
          <a href={`#${id}`} onClick={() => setIsOpen(false)}>
            {children}
          </a>
        </li>
      );
    }
    return (
      <li>
        <Link to={`/#${id}`} onClick={() => setIsOpen(false)}>
          {children}
        </Link>
      </li>
    );
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: 'inherit' }}>
          CS<span className="dot">.</span>
        </Link>
      </div>
      <ul className={`nav-links ${isOpen ? 'nav-active' : ''}`}>
        <NavLink id="hero">Home</NavLink>
        <NavLink id="about">About</NavLink>
        <NavLink id="skills">Skills</NavLink>
        <NavLink id="projects">Projects</NavLink>
        <NavLink id="contact">Contact</NavLink>
        <li><Link to="/blogs" onClick={() => setIsOpen(false)}>Blogs</Link></li>
      </ul>
      <div className="nav-actions">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Dark Mode">
          {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
        </button>
        <div className={`hamburger ${isOpen ? 'toggle' : ''}`} onClick={toggleMenu}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;