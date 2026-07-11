import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  // State hook to manage input fields (name, email, message)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  // State hook to manage status message display (e.g. 'Sending...', 'Message sent successfully!')
  const [status, setStatus] = useState('');

  // Handle text input changes dynamically using input 'name' attributes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Submit handler for contact form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      // POST form data to the local/deployed API endpoint '/api/send'
      // Note: This matches the proxy path in vite.config.js for local development
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      if (response.ok && result.success) {
        setStatus('Message sent successfully!');
        // Reset the form fields on success
        setFormData({ name: '', email: '', message: '' });
        
        // Clear the success status message after 4 seconds
        setTimeout(() => {
          setStatus('');
        }, 4000);
      } else {
        // Show server-provided error message or fallback error text
        setStatus(result.error || 'Something went wrong. Please try again.');
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

        <form className="contact-form" onSubmit={handleSubmit}>

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