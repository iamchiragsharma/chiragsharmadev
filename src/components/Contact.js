import React, { useState } from 'react';
import { FaCommentDots, FaTimes, FaRobot } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: 'bc6f0fdc-67de-4ae9-a5b4-a91d09a6e286',
          subject: 'New Submission from Portfolio',
          ...formData
        })
      });
      const result = await response.json();
      if (result.success) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        
        // Clear success message after 4 seconds
        setTimeout(() => {
          setStatus('');
        }, 4000);
      } else {
        setStatus('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      {/* AI Chat Widget */}
      <div className="chat-widget-container">
        {/* Chat Modal */}
        <div className={`chat-modal ${isChatOpen ? 'open' : ''}`}>
          <div className="chat-header">
            <div className="chat-header-info">
              <FaRobot size={20} className="ai-icon" />
              <h3>AI Assistant</h3>
            </div>
          </div>
          
          <div className="chat-body">
            <p className="chat-welcome">Hi there! 👋 I'm Chirag's virtual assistant. Drop a message below and I'll make sure it reaches him directly!</p>
            
            <form action="https://api.web3forms.com/submit" method="POST" className="chat-form" onSubmit={handleSubmit}>
              <input type="hidden" name="access_key" value="bc6f0fdc-67de-4ae9-a5b4-a91d09a6e286" />
              <input type="hidden" name="subject" value="New Submission from Portfolio" />

              <div className="chat-input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="hover-target"
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="hover-target"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <textarea
                name="message"
                placeholder="How can we help you today?"
                rows="4"
                required
                className="hover-target"
                value={formData.message}
                onChange={handleChange}
              ></textarea>

              <button type="submit" className="btn btn-primary chat-submit-btn hover-target">Send Message</button>
              {status && <p className="chat-status">{status}</p>}
            </form>
          </div>
        </div>

        {/* Floating Action Button */}
        <button 
          className={`chat-fab hover-target ${isChatOpen ? 'active' : ''}`}
          onClick={() => setIsChatOpen(!isChatOpen)}
          aria-label="Open contact form"
        >
          {/* Pulsing notification badge in the corner */}
          {!isChatOpen && <span className="chat-fab-badge"></span>}
          {isChatOpen ? <FaTimes size={24} /> : <FaCommentDots size={24} />}
        </button>
      </div>

      {/* Static Minimal Footer */}
      <footer id="contact" className="minimal-footer">
        <div className="social-links">
          <a href="https://www.linkedin.com/in/ch1r4gsh4rm4/" target="_blank" rel="noopener noreferrer" className="hover-target">LinkedIn</a>
          <a href="https://github.com/iamchiragsharma" target="_blank" rel="noopener noreferrer" className="hover-target">GitHub</a>
        </div>
        <p className="copyright">&copy; 2026 Designed & Built by <span className="name-highlight">Chirag Sharma</span>.</p>
      </footer>
    </>
  );
};

export default Contact;