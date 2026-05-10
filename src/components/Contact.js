import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
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
      } else {
        setStatus('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('Something went wrong. Please try again.');
    }
  };

  return (
    <footer id="contact" className="section">
      <div className="footer-content fade-up">
        <h2 className="section-title">Get In Touch</h2>
        <p>I am always open to discussing new projects, creative ideas, or opportunities. Drop me a message below!</p>

        <form action="https://api.web3forms.com/submit" method="POST" className="contact-form" onSubmit={handleSubmit}>
          <input type="hidden" name="access_key" value="bc6f0fdc-67de-4ae9-a5b4-a91d09a6e286" />
          <input type="hidden" name="subject" value="New Submission from Portfolio" />

          <div className="form-group">
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
            placeholder="Your Message"
            rows="5"
            required
            className="hover-target"
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit" className="btn btn-primary hover-target">Send Message</button>
          {status && <p className="form-status" style={{ marginTop: '15px' }}>{status}</p>}
        </form>

        <div className="social-links">
          <a href="https://www.linkedin.com/in/ch1r4gsh4rm4/" target="_blank" rel="noopener noreferrer" className="hover-target">LinkedIn</a>
          <a href="https://github.com/iamchiragsharma" target="_blank" rel="noopener noreferrer" className="hover-target">GitHub</a>
        </div>
        <p className="copyright">&copy; 2026 Designed & Built by <span className="name-highlight">Chirag Sharma</span>.</p>
      </div>
    </footer>
  );
};

export default Contact;