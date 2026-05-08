import { useEffect } from 'react';

const vibrantColors = [
  '#ec4899', // Pink
  '#8b5cf6', // Purple
  '#3b82f6', // Blue
  '#14b8a6', // Teal
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ef4444'  // Red
];

export const useHoverEffect = () => {
  useEffect(() => {
    const handleMouseEnter = (el) => {
      const randomColor = vibrantColors[Math.floor(Math.random() * vibrantColors.length)];

      if (el.classList.contains('btn-primary')) {
        el.style.backgroundColor = randomColor;
        el.style.borderColor = randomColor;
        el.style.boxShadow = `0 10px 20px -10px ${randomColor}`;
      } else if (el.classList.contains('btn-outline') || el.classList.contains('social-links')) {
        el.style.color = randomColor;
        el.style.borderColor = randomColor;
      } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.style.borderColor = randomColor;
        el.style.boxShadow = `0 0 0 3px ${randomColor}33`;
      } else {
        el.style.borderColor = randomColor;
        el.style.transform = 'translateY(-5px)';
        el.style.boxShadow = `0 15px 30px -10px ${randomColor}66`;

        const icon = el.querySelector('.skill-icon');
        if (icon) icon.style.color = randomColor;
      }
    };

    const handleMouseLeave = (el) => {
      el.style.backgroundColor = '';
      el.style.borderColor = '';
      el.style.color = '';
      el.style.boxShadow = '';
      el.style.transform = '';

      const icon = el.querySelector('.skill-icon');
      if (icon) icon.style.color = '';
    };

    const hoverTargets = document.querySelectorAll('.hover-target');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => handleMouseEnter(el));
      el.addEventListener('mouseleave', () => handleMouseLeave(el));
    });

    return () => {
      hoverTargets.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);
};