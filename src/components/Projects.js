import React from 'react';
import './Projects.css';

const Projects = () => {
  const projects = [
    { title: 'BuyNutritionals', type: 'Company\'s External Project' },
    { title: 'BST Group', type: 'Company\'s External Project' },
    { title: 'The Instrument Place', type: 'Company\'s External Project' },
    { title: 'Used Parts Depot', type: 'Company\'s External Project' },
    { title: 'Farm Fresh Oils', type: 'Company\'s External Project' },
    { title: 'Unstd Clothing', type: 'Company\'s External Project' },
  ];

  return (
    <section id="projects" className="section">
      <h2 className="section-title fade-up">Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card fade-up hover-target">
            <div className="project-info">
              <p>{project.type}</p>
              <h3>{project.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;