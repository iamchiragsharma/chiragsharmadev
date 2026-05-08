import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaThumbsUp, FaComment } from 'react-icons/fa';
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    const foundBlog = storedBlogs.find(b => b.id === parseInt(id));
    if (foundBlog) {
      setBlog(foundBlog);
      setComments(foundBlog.comments || []);
    }
  }, [id]);

  const handleLike = () => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    const updatedBlogs = storedBlogs.map(b =>
      b.id === parseInt(id) ? { ...b, likes: b.likes + 1 } : b
    );
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    setBlog({ ...blog, likes: blog.likes + 1 });
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: Date.now(),
        text: comment,
        date: new Date().toISOString()
      };
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      setComment('');

      const storedBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');
      const updatedBlogs = storedBlogs.map(b =>
        b.id === parseInt(id) ? { ...b, comments: updatedComments } : b
      );
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    }
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <section className="blog-detail section">
      <button onClick={() => navigate('/blogs')} className="back-btn">← Back to Blogs</button>
      <h1>{blog.title}</h1>
      <p className="blog-date">{new Date(blog.date).toLocaleDateString()}</p>
      <div className="blog-content">
        {blog.content.split('\n').map((line, index) => (
          <p key={index} style={{ marginBottom: '1rem' }}>
            {line.startsWith('##') ? (
              <strong style={{ fontSize: '1.2rem' }}>{line.replace('##', '').trim()}</strong>
            ) : line.startsWith('###') ? (
              <strong style={{ fontSize: '1.1rem' }}>{line.replace('###', '').trim()}</strong>
            ) : line.startsWith('-') ? (
              `• ${line.replace('-', '').trim()}`
            ) : line.startsWith('```') ? (
              <code style={{ display: 'block', background: '#f5f5f5', padding: '1rem', borderRadius: '4px', margin: '1rem 0' }}>
                {line.replace(/```/g, '')}
              </code>
            ) : (
              line
            )}
          </p>
        ))}
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