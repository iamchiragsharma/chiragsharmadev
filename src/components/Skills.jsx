import React from 'react';
import { FaShopify, FaWordpress, FaCode, FaDatabase, FaServer, FaRocket, FaTools, FaSearch, FaBolt, FaHtml5, FaCss3, FaJs, FaPhp, FaReact, FaGithub, FaBitbucket, FaTasks, FaProjectDiagram, FaFileAlt, FaBrain } from 'react-icons/fa';
import { SiAdobe } from 'react-icons/si';
import './Skills.css';

const Skills = () => {
  const skillsData = [
    {
      category: 'Adobe Commerce (Open Source) & E-Commerce',
      skills: [
        { name: 'Adobe Commerce (Open Source) Core', icon: <SiAdobe /> },
        { name: 'Shopify', icon: <FaShopify /> },
        { name: 'WordPress', icon: <FaWordpress /> },
        { name: 'Theme Customization', icon: <FaCode /> },
        { name: 'Module Customization', icon: <FaTools /> },
        { name: '3rd Party Integrations', icon: <FaRocket /> },
        { name: 'Adobe Commerce (Open Source) Upgrades', icon: <FaBolt /> },
        { name: 'Patches Applied', icon: <FaTools /> },
        { name: 'Site Performance', icon: <FaBolt /> },
        { name: 'Caching', icon: <FaServer /> },
      ]
    },
    {
      category: 'Core Languages & Database',
      skills: [
        { name: 'HTML5', icon: <FaHtml5 /> },
        { name: 'CSS3', icon: <FaCss3 /> },
        { name: 'JavaScript (ES6)', icon: <FaJs /> },
        { name: 'PHP', icon: <FaPhp /> },
        { name: 'MySQL', icon: <FaDatabase /> },
        { name: 'REST APIs', icon: <FaServer /> },
      ]
    },
    {
      category: 'Frameworks & Libraries',
      skills: [
        { name: 'React.js', icon: <FaReact /> },
        { name: 'KnockoutJS', icon: <FaJs /> },
        { name: 'jQuery', icon: <FaCode /> },
        { name: 'AJAX', icon: <FaBolt /> },
        { name: 'Bootstrap', icon: <FaCode /> },
      ]
    },
    {
      category: 'Tools, Strategy & Workflow',
      skills: [
        { name: 'Git', icon: <FaGithub /> },
        { name: 'GitHub', icon: <FaGithub /> },
        { name: 'Bitbucket', icon: <FaBitbucket /> },
        { name: 'Requirements Gathering', icon: <FaSearch /> },
        { name: 'Requirements Analysis', icon: <FaTasks /> },
        { name: 'Project Management', icon: <FaProjectDiagram /> },
        { name: 'Report Writing', icon: <FaFileAlt /> },
        { name: 'Problem Solving', icon: <FaBrain /> },
      ]
    }
  ];

  return (
    <section id="skills" className="section">
      <h2 className="section-title fade-up">Technical Skills</h2>
      <div className="skills-container">
        {skillsData.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <div className="category-title fade-up">
              <h3>{category.category}</h3>
            </div>
            <div className="skills-grid">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="skill-card fade-up hover-target">
                  <div className="skill-icon">{skill.icon}</div>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;