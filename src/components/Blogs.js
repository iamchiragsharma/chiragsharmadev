import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { sampleBlogs } from '../data/blogsData';
import './Blogs.css';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load blogs from localStorage or initialize with sample data
    try {
      const stored = localStorage.getItem('blogs_v3');
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
    localStorage.setItem('blogs_v3', JSON.stringify(sampleBlogs));
  }, []);

  const filteredBlogs = useMemo(() => {
    if (!searchQuery.trim()) return blogs;
    
    const query = searchQuery.toLowerCase();
    return blogs.filter(blog => 
      blog.title.toLowerCase().includes(query) || 
      blog.excerpt.toLowerCase().includes(query)
    );
  }, [blogs, searchQuery]);

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
  }, [filteredBlogs]);

  return (
    <section className="blogs section">
      <div className="blogs-header">
        <h2 className="section-title visible">My Blogs</h2>
        
        <div className="blog-search-wrapper fade-up visible">
          <div className="blog-search-container">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search articles by title or content..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="blog-search-input"
            />
            {searchQuery && (
              <button className="search-clear-btn" onClick={() => setSearchQuery('')} aria-label="Clear search">
                <FaTimes />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="blogs-grid">
        {blogs && blogs.length > 0 ? (
          filteredBlogs.length > 0 ? (
            filteredBlogs.map(blog => (
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
            <div className="blogs-empty-state fade-up visible">
              <p>No articles found matching "{searchQuery}"</p>
              <button className="btn btn-primary" onClick={() => setSearchQuery('')}>Clear Search</button>
            </div>
          )
        ) : (
          <p className="loading">Fetching the latest stories...</p>
        )}
      </div>
    </section>
  );
};

export default Blogs;