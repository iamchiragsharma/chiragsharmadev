import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaThumbsUp, FaComment } from 'react-icons/fa';
import { sampleBlogs } from '../data/blogsData';
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs_v2'));
    const sourceData = storedBlogs && storedBlogs.length > 0 ? storedBlogs : sampleBlogs;
    const foundBlog = sourceData.find(b => b.id === parseInt(id));
    if (foundBlog) {
      setBlog(foundBlog);
      setComments(foundBlog.comments || []);
    }
  }, [id]);

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
  }, [blog]);

  const handleLike = () => {
    let storedBlogs = JSON.parse(localStorage.getItem('blogs_v2'));
    if (!storedBlogs || storedBlogs.length === 0) {
      storedBlogs = sampleBlogs;
    }
    const updatedBlogs = storedBlogs.map(b =>
      b.id === parseInt(id) ? { ...b, likes: (b.likes || 0) + 1 } : b
    );
    localStorage.setItem('blogs_v2', JSON.stringify(updatedBlogs));
    setBlog(prev => ({ ...prev, likes: (prev.likes || 0) + 1 }));
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: Date.now(),
        text: comment,
        date: new Date().toISOString()
      };
      let storedBlogs = JSON.parse(localStorage.getItem('blogs_v2'));
      if (!storedBlogs || storedBlogs.length === 0) {
        storedBlogs = sampleBlogs;
      }
      const updatedComments = [...(comments || []), newComment];
      setComments(updatedComments);
      setComment('');

      const updatedBlogs = storedBlogs.map(b =>
        b.id === parseInt(id) ? { ...b, comments: updatedComments } : b
      );
      localStorage.setItem('blogs_v2', JSON.stringify(updatedBlogs));
    }
  };

  if (!blog) return <div className="loading">Loading...</div>;

  const renderContent = (content) => {
    return content.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('## ')) {
        return <h2 key={index} className="blog-h2">{trimmedLine.replace('## ', '')}</h2>;
      }
      if (trimmedLine.startsWith('### ')) {
        return <h3 key={index} className="blog-h3">{trimmedLine.replace('### ', '')}</h3>;
      }
      if (trimmedLine.startsWith('- ')) {
        return <li key={index} className="blog-li">{trimmedLine.replace('- ', '')}</li>;
      }
      if (trimmedLine === '') {
        return <div key={index} className="blog-spacer" />;
      }
      return <p key={index} className="blog-p">{line}</p>;
    });
  };

  return (
    <section className="blog-detail section">
      <button onClick={() => navigate('/blogs')} className="back-btn">← Back to Blogs</button>
      <div className="blog-header fade-up">
        <h1>{blog.title}</h1>
        <div className="blog-meta">
          <span className="blog-category">{blog.category}</span>
          <span className="blog-date">{new Date(blog.date).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="blog-content fade-up">
        {renderContent(blog.content)}
      </div>
      <div className="blog-actions">
        <button onClick={handleLike} className="like-btn">
          <FaThumbsUp /> Like ({blog.likes})
        </button>
      </div>
      <div className="comments-section">
        <h3><FaComment /> Comments</h3>
        <form onSubmit={handleComment} className="comment-form">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            required
          ></textarea>
          <button type="submit" className="btn btn-primary">Post Comment</button>
        </form>
        <div className="comments-list">
          {comments.map(c => (
            <div key={c.id} className="comment">
              <p>{c.text}</p>
              <small>{new Date(c.date).toLocaleString()}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;