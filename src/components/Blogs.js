import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sampleBlogs } from '../data/blogsData';
import './Blogs.css';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Load blogs from localStorage or initialize with sample data
    try {
      const stored = localStorage.getItem('blogs_v2');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBlogs(parsed);
          return;
        }
      }
    } catch (e) {
      console.error("Error loading blogs from localStorage:", e);
    }
    
    // Fallback to sample data
    setBlogs(sampleBlogs);
    localStorage.setItem('blogs_v2', JSON.stringify(sampleBlogs));
  }, []);

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-up');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [blogs]);

  return (
    <section className="blogs section">
      <h2 className="section-title visible">My Blogs</h2>
      <div className="blogs-grid">
        {blogs && blogs.length > 0 ? (
          blogs.map(blog => (
            <div key={blog.id} className="blog-card fade-up hover-target">
              <div className="blog-card-content">
                <h3>{blog.title}</h3>
                <p>{blog.excerpt}</p>
              </div>
              <div className="blog-footer">
                <p className="blog-date">{new Date(blog.date).toLocaleDateString()}</p>
                <Link to={`/blogs/${blog.id}`} className="btn btn-outline hover-target">Read More</Link>
              </div>
            </div>
          ))
        ) : (
          <p className="loading">Fetching the latest stories...</p>
        )}
      </div>
    </section>
  );
};

export default Blogs;