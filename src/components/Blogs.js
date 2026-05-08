import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Blogs.css';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Load blogs from localStorage or initialize with sample data
    const storedBlogs = localStorage.getItem('blogs');
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    } else {
      const sampleBlogs = [
        // Magento 2 Blogs
        {
          id: 1,
          title: 'Magento 2 PWA: Building Progressive Web Applications in 2024',
          excerpt: 'Explore how to build Progressive Web Applications with Magento 2 for better performance and offline capabilities.',
          category: 'Magento 2',
          content: `Progressive Web Applications are revolutionizing e-commerce. Magento 2 provides excellent support for PWA development with service workers and offline functionality.`,
          date: '2024-12-01',
          likes: 0,
          comments: []
        },
        {
          id: 2,
          title: 'Magento 2 AI-Powered Product Recommendations: Game Changer for E-commerce',
          excerpt: 'How to leverage AI and machine learning in Magento 2 to deliver personalized product recommendations.',
          category: 'Magento 2',
          content: `Artificial Intelligence is transforming e-commerce. Implementing AI-powered recommendations in Magento 2 can increase revenue by 30-35%.`,
          date: '2024-11-28',
          likes: 0,
          comments: []
        },
        {
          id: 3,
          title: 'Headless Magento 2: The Future of Flexible E-commerce Architecture',
          excerpt: 'Understanding headless commerce and how Magento 2 GraphQL enables omnichannel selling.',
          category: 'Magento 2',
          content: `Headless commerce decouples the frontend from backend, providing flexibility for modern retailers. Magento 2 with GraphQL enables this transformation.`,
          date: '2024-11-25',
          likes: 0,
          comments: []
        },
        {
          id: 4,
          title: 'Magento 2 Security Essentials: Protecting Your Store in 2024',
          excerpt: 'Critical security practices and tools for maintaining a secure Magento 2 e-commerce platform.',
          category: 'Magento 2',
          content: `Security is paramount in e-commerce. Implementing best practices protects customer data and maintains trust in your Magento 2 store.`,
          date: '2024-11-20',
          likes: 0,
          comments: []
        },
        {
          id: 5,
          title: 'Magento 2 Performance Optimization: From 2s to Sub-500ms Load Time',
          excerpt: 'Advanced techniques to dramatically improve your Magento 2 store performance and Core Web Vitals.',
          category: 'Magento 2',
          content: `Performance impacts sales directly. Optimizing Magento 2 can increase conversions by 10-15% per second of improvement.`,
          date: '2024-11-15',
          likes: 0,
          comments: []
        },
        // Shopify Blogs
        {
          id: 6,
          title: 'Shopify Hydrogen: Building Headless Commerce Experiences',
          excerpt: 'Master Shopify Hydrogen and create custom, high-performance storefronts with React and TypeScript.',
          category: 'Shopify',
          content: `Shopify Hydrogen is a React framework for building custom storefronts. Deliver fast, flexible shopping experiences with complete creative control.`,
          date: '2024-11-18',
          likes: 0,
          comments: []
        },
        {
          id: 7,
          title: 'Shopify App Development: Creating Revenue-Generating Apps',
          excerpt: 'Complete guide to developing, publishing, and monetizing Shopify apps that generate consistent revenue.',
          category: 'Shopify',
          content: `The Shopify App Store is a multi-billion dollar marketplace. Developing specialized apps can generate significant recurring revenue.`,
          date: '2024-11-12',
          likes: 0,
          comments: []
        },
        {
          id: 8,
          title: 'Shopify Subscriptions: Recurring Revenue Model Implementation',
          excerpt: 'How to implement subscription services on Shopify and build predictable recurring revenue.',
          category: 'Shopify',
          content: `Subscriptions provide predictable revenue. Implement them on Shopify to increase customer lifetime value by 2-3x.`,
          date: '2024-11-08',
          likes: 0,
          comments: []
        },
        {
          id: 9,
          title: 'Shopify Multi-Channel Selling: Omnichannel Strategy Guide',
          excerpt: 'Maximize reach by selling across Shopify, Amazon, TikTok Shop, and other channels simultaneously.',
          category: 'Shopify',
          content: `Omnichannel selling multiplies revenue opportunities. Manage multiple channels seamlessly with Shopify integrations.`,
          date: '2024-11-05',
          likes: 0,
          comments: []
        },
        {
          id: 10,
          title: 'Shopify Conversion Rate Optimization: 5 Proven Tactics',
          excerpt: 'Data-driven CRO strategies that increased Shopify store conversions by 40-60% in real case studies.',
          category: 'Shopify',
          content: `Conversion optimization makes existing traffic work harder. Small improvements compound into significant revenue gains for your store.`,
          date: '2024-11-01',
          likes: 0,
          comments: []
        },
        // WordPress Blogs
        {
          id: 11,
          title: 'WordPress Block Editor: Complete Guide to Full-Site Editing',
          excerpt: 'Master WordPress Block Editor and Full-Site Editing for powerful, no-code website design capabilities.',
          category: 'WordPress',
          content: `Full-Site Editing allows you to design every aspect of your WordPress site without touching code using the Block Editor.`,
          date: '2024-11-10',
          likes: 0,
          comments: []
        },
        {
          id: 12,
          title: 'WordPress Performance Optimization: Advanced Caching Strategies',
          excerpt: 'Technical guide to implementing advanced caching, CDN, and optimization techniques for WordPress.',
          category: 'WordPress',
          content: `Advanced caching strategies can improve WordPress load times dramatically. Master Redis, Varnish, and CDN integration for best results.`,
          date: '2024-11-03',
          likes: 0,
          comments: []
        },
        {
          id: 13,
          title: 'WordPress Security Best Practices: Protecting Your Site',
          excerpt: 'Comprehensive security guide covering vulnerabilities, hardening techniques, and security tools.',
          category: 'WordPress',
          content: `WordPress security is critical. Implement best practices to protect your site from hacks and malware threats.`,
          date: '2024-10-28',
          likes: 0,
          comments: []
        },
        {
          id: 14,
          title: 'WordPress API Development: Building Custom Plugins with REST API',
          excerpt: 'Advanced guide to WordPress REST API for building custom plugins, mobile apps, and integrations.',
          category: 'WordPress',
          content: `The WordPress REST API enables building sophisticated applications on WordPress. Create custom plugins, mobile apps, and integrations.`,
          date: '2024-10-25',
          likes: 0,
          comments: []
        },
        {
          id: 15,
          title: 'WordPress E-commerce Setup: Complete WooCommerce Guide',
          excerpt: 'Build a complete e-commerce store with WordPress and WooCommerce, from setup to optimization.',
          category: 'WordPress',
          content: `WordPress with WooCommerce powers 30% of online stores. Build a complete e-commerce solution that\'s flexible and cost-effective.`,
          date: '2024-10-20',
          likes: 0,
          comments: []
        }
      ];
      setBlogs(sampleBlogs);
      localStorage.setItem('blogs', JSON.stringify(sampleBlogs));
    }
  }, []);

  return (
    <section className="blogs section">
      <h2 className="section-title fade-up">My Blogs</h2>
      <div className="blogs-grid">
        {blogs.map(blog => (
          <div key={blog.id} className="blog-card fade-up hover-target">
            <h3>{blog.title}</h3>
            <p>{blog.excerpt}</p>
            <p className="blog-date">{new Date(blog.date).toLocaleDateString()}</p>
            <Link to={`/blogs/${blog.id}`} className="btn btn-outline">Read More</Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;