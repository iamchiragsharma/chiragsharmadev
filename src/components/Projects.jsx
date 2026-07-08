import React, { useRef, useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Projects.css';

const projects = [
  { title: 'BuyNutritionals', type: 'Company\'s External Project', images: ['/Buynutritionals.png'] },
  { title: 'BST Group', type: 'Company\'s External Project', images: ['/bst-group.png', '/bst-tfs.png', '/bst-health.png'] },
  { title: 'The Instrument Place', type: 'Company\'s External Project', images: ['/the_instrument_place.png'] },
  { title: 'Used Parts Depot', type: 'Company\'s External Project', images: ['/used_parts_depot.png'] },
  { title: 'Farm Fresh Oils', type: 'Company\'s External Project', images: ['/farm_fresh_oils.png'] },
  { title: 'Unstd Clothing', type: '', images: ['/unstd_clothing.png'] },
];

const ProjectCard = ({ project, isActive }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    if (project.images && project.images.length > 0) {
      setCurrentImage((prev) => (prev + 1) % project.images.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (project.images && project.images.length > 0) {
      setCurrentImage((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  const hasImages = project.images && project.images.length > 0;
  const showControls = project.images && project.images.length > 1;

  return (
    <div className={`project-card hover-target ${isActive ? 'active' : ''}`}>
      {hasImages && (
        <div className="project-image-container">
          <img src={project.images[currentImage]} alt={`${project.title} screenshot ${currentImage + 1}`} className="project-image fade-in-image" key={currentImage} />
          
          {showControls && (
            <div className="nested-slider-controls">
              <button className="nested-slider-arrow left-arrow" onClick={prevImage} aria-label="Previous image">
                <FaChevronLeft size={12} />
              </button>
              <button className="nested-slider-arrow right-arrow" onClick={nextImage} aria-label="Next image">
                <FaChevronRight size={12} />
              </button>
              <div className="nested-slider-dots">
                {project.images.map((_, idx) => (
                  <span key={idx} className={`nested-dot ${idx === currentImage ? 'active' : ''}`} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="project-info">
        {project.type && <p>{project.type}</p>}
        <h3>{project.title}</h3>
      </div>
    </div>
  );
};

const Projects = () => {
  const sliderRef = useRef(null);
  const animationRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const slider = sliderRef.current;
    const scrollLeft = slider.scrollLeft;
    
    // Check scroll boundaries (allow 5px tolerance)
    const tolerance = 5;
    setCanScrollLeft(scrollLeft > tolerance);
    setCanScrollRight(scrollLeft + slider.clientWidth < slider.scrollWidth - tolerance);

    const cards = Array.from(slider.children);
    if (cards.length === 0) return;

    // Active project is in the middle of the screen
    const centerPoint = scrollLeft + slider.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - centerPoint);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  useEffect(() => {
    handleScroll();
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', handleScroll);
    }
    window.addEventListener('resize', handleScroll);
    return () => {
      if (slider) {
        slider.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const smoothScroll = (element, target, duration) => {
    // Cancel any ongoing animations to prevent overlapping glitches
    cancelAnimationFrame(animationRef.current);
    
    target = Math.round(target);
    const start = element.scrollLeft;
    const change = target - start;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Quartic ease-in-out curve for rich, slow deceleration
      const easeProgress = progress < 0.5
        ? 8 * progress * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 4) / 2;

      element.scrollLeft = start + change * easeProgress;

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateScroll);
      } else {
        // Re-enable snapping. Because we calculated the exact target, it won't jerk.
        element.style.scrollSnapType = 'x mandatory';
      }
    };

    element.style.scrollSnapType = 'none';
    animationRef.current = requestAnimationFrame(animateScroll);
  };

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    
    const slider = sliderRef.current;
    const scrollLeft = slider.scrollLeft;
    const cards = Array.from(slider.children);
    
    if (cards.length === 0) return;

    // Find the currently active card dynamically in the middle of the screen
    const centerPoint = scrollLeft + slider.clientWidth / 2;
    let currentCardIndex = 0;
    let minDistance = Infinity;
    
    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - centerPoint);
      if (distance < minDistance) {
        minDistance = distance;
        currentCardIndex = index;
      }
    });

    // Determine target index and clamp bounds
    let targetIndex = direction === 'left' ? currentCardIndex - 1 : currentCardIndex + 1;
    targetIndex = Math.max(0, Math.min(targetIndex, cards.length - 1));
    
    if (targetIndex === currentCardIndex) return; // Already at end

    // Calculate exact scroll position required to perfectly center the target card
    const targetCard = cards[targetIndex];
    const targetScroll = targetCard.offsetLeft - (slider.clientWidth / 2 - targetCard.offsetWidth / 2);
    
    // 1250ms slow, rich smooth scroll
    smoothScroll(slider, targetScroll, 1250);
  };

  return (
    <section id="projects" className="section">
      <div className="projects-header fade-up">
        <h2 className="section-title">Projects</h2>
        <span className="mobile-swipe-indicator">Swipe to see more →</span>
      </div>
      
      <div className="projects-slider-wrapper fade-up">
        <button 
          className={`slider-arrow slider-arrow-left ${!canScrollLeft ? 'disabled' : ''}`} 
          onClick={() => scroll('left')} 
          aria-label="Previous projects"
          disabled={!canScrollLeft}
        >
          <FaChevronLeft size={22} />
        </button>
        
        <div className="projects-slider" ref={sliderRef}>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} isActive={index === activeIndex} />
          ))}
        </div>

        <button 
          className={`slider-arrow slider-arrow-right ${!canScrollRight ? 'disabled' : ''}`} 
          onClick={() => scroll('right')} 
          aria-label="Next projects"
          disabled={!canScrollRight}
        >
          <FaChevronRight size={22} />
        </button>
      </div>
    </section>
  );
};

export default Projects;