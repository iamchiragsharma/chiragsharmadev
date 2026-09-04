import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaPaperPlane, FaTimes, FaRedo, FaCopy, FaCheck, FaEdit } from 'react-icons/fa';
import './AIAssistant.css';

// Modern Minimalist AI Sparkle Icon
const ModernAIIcon = ({ size = 20, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z" fill="currentColor" fillOpacity="0.25" />
    <path d="M19 17L20 19L22 20L20 21L19 23L18 21L16 20L18 19L19 17Z" fill="currentColor" fillOpacity="0.25" />
    <path d="M5 3L5.8 4.6L7.4 5.4L5.8 6.2L5 7.8L4.2 6.2L2.6 5.4L4.2 4.6L5 3Z" fill="currentColor" fillOpacity="0.25" />
  </svg>
);

// Predefined Queries and Ready Responses for Chirag Sharma Portfolio
const CHIRAG_PRESET_QUERIES = [
  {
    id: 'exp',
    label: '💼 Experience & Role',
    question: "What is Chirag's experience & current role?",
    response: `### **Professional Experience & Current Role**

Chirag Sharma is a dedicated **Software Developer** at **Sookshum Labs** in Mohali, Punjab, India, with **2+ years of professional experience** delivering high-performance e-commerce platforms.

#### **Key Highlights:**
* **Current Company**: Sookshum Labs (Mohali, India)
* **Core Specialty**: **Adobe Commerce (Open Source)** architecture, custom module engineering, API integrations, and database tuning.
* **Store Optimization**: Proven track record of boosting storefront speeds by up to 35% through advanced Varnish, Redis, and OpenSearch configurations.
* **Global Delivery**: Engineered and maintained multi-store B2B and B2C platforms for international clients.`
  },
  {
    id: 'adobe',
    label: '🛒 Adobe Commerce Skills',
    question: "Tell me about your Adobe Commerce (Open Source) expertise",
    response: `### **Adobe Commerce (Open Source) Specialization**

Chirag specializes in enterprise-grade Adobe Commerce (Open Source) development:

* **Custom Module & Extension Development**: Adheres strictly to Adobe Commerce architectural best practices, clean dependency injection, and declarative schema.
* **Third-Party Integrations**: Seamless integration of ERPs, CRMs, custom payment gateways (Stripe, PayPal, Authorize.net), and carrier shipping APIs.
* **Performance Tuning**: Advanced Varnish cache configurations, Redis session & cache handling, Elasticsearch/OpenSearch indexing, and MySQL query optimization.
* **Version Upgrades & Patching**: Executing zero-downtime upgrades, PHP version migrations, and critical security patches.`
  },
  {
    id: 'projects',
    label: '🚀 Featured Client Projects',
    question: "What are Chirag's top featured client projects?",
    response: `### **Featured Client Projects**

Chirag has engineered multiple high-profile, revenue-critical e-commerce platforms:

1. **BuyNutritionals**: High-performance supplement store with custom product filtering, automated subscription refills, and seamless checkout.
2. **BST Group (BST TFS & BST Health)**: Multi-store B2B & B2C enterprise solution featuring customized tier-pricing, customer group catalogs, and ERP integration.
3. **The Instrument Place**: Specialized musical instrument portal with online rental workflows and custom shipping matrix rules.
4. **Used Parts Depot**: Heavy-catalog automotive parts marketplace with rapid OpenSearch faceted search and VIN lookup.
5. **Farm Fresh Oils & Unstd Clothing**: Modern direct-to-consumer storefronts optimized for high conversion and mobile responsiveness.`
  },
  {
    id: 'skills',
    label: '🛠️ Tech Stack & Skills',
    question: "What tech stack, languages & frameworks do you use?",
    response: `### **Technical Skills & Stack**

* **E-Commerce & Platforms**: Adobe Commerce (Open Source), Shopify, WordPress
* **Backend Development**: PHP 8.x, MySQL, RESTful APIs, GraphQL
* **Frontend Development**: React.js, JavaScript (ES6+), KnockoutJS, jQuery, HTML5, CSS3, Responsive Design
* **Caching & Search Engines**: Varnish Cache, Redis, Elasticsearch, OpenSearch
* **Tools & Environment**: Git, GitHub, Linux / Ubuntu, Nginx, Apache, Composer, Postman`
  },
  {
    id: 'services',
    label: '⚡ E-Commerce Services',
    question: "What services can Chirag provide for e-commerce stores?",
    response: `### **E-Commerce Engineering Services**

Chirag offers end-to-end development services for businesses:

1. **Store Development**: Building fast, modern Adobe Commerce (Open Source) & Shopify storefronts.
2. **Custom Module Development**: Extending platform functionality without touching core code.
3. **Speed & Core Web Vitals Optimization**: Fixing slow TTFB, LCP, and caching bottlenecks.
4. **Security & Upgrades**: Keeping stores patched, secure, and running on modern PHP versions.
5. **Third-Party Integrations**: Connecting warehouses, accounting, payment gateways, and shipping.`
  },
  {
    id: 'contact',
    label: '📬 Contact & Hire Chirag',
    question: "How can I get in touch or hire Chirag?",
    response: `### **Let's Connect & Work Together**

Chirag is open to discussing new opportunities, high-impact freelance projects, and e-commerce consulting!

* 📧 **Email**: [chirag2001sharma@gmail.com](mailto:chirag2001sharma@gmail.com)
* 💼 **LinkedIn**: [linkedin.com/in/ch1r4gsh4rm4](https://www.linkedin.com/in/ch1r4gsh4rm4/)
* 🐙 **GitHub**: [github.com/iamchiragsharma](https://github.com/iamchiragsharma)
* 📍 **Location**: Mohali / Chandigarh, Punjab, India`
  }
];

// Smart Matcher for Chirag's Ready Responses (Zero API Latency, 100% Reliable)
const getChiragResponse = (query) => {
  const q = query.toLowerCase().trim();

  // Check exact question match
  const exactMatch = CHIRAG_PRESET_QUERIES.find(p => p.question.toLowerCase() === q);
  if (exactMatch) return exactMatch.response;

  // Keyword-based matcher
  if (q.includes('adobe') || q.includes('commerce') || q.includes('magento') || q.includes('module') || q.includes('theme') || q.includes('extension')) {
    return CHIRAG_PRESET_QUERIES.find(p => p.id === 'adobe').response;
  }
  if (q.includes('experience') || q.includes('sookshum') || q.includes('role') || q.includes('work') || q.includes('job') || q.includes('career') || q.includes('company')) {
    return CHIRAG_PRESET_QUERIES.find(p => p.id === 'exp').response;
  }
  if (q.includes('project') || q.includes('buynutritionals') || q.includes('bst') || q.includes('instrument') || q.includes('parts') || q.includes('client') || q.includes('portfolio')) {
    return CHIRAG_PRESET_QUERIES.find(p => p.id === 'projects').response;
  }
  if (q.includes('stack') || q.includes('tech') || q.includes('skill') || q.includes('php') || q.includes('react') || q.includes('mysql') || q.includes('varnish') || q.includes('language')) {
    return CHIRAG_PRESET_QUERIES.find(p => p.id === 'skills').response;
  }
  if (q.includes('service') || q.includes('help') || q.includes('offer') || q.includes('provide') || q.includes('speed') || q.includes('optimization') || q.includes('upgrade')) {
    return CHIRAG_PRESET_QUERIES.find(p => p.id === 'services').response;
  }
  if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach') || q.includes('linkedin') || q.includes('github') || q.includes('message')) {
    return CHIRAG_PRESET_QUERIES.find(p => p.id === 'contact').response;
  }

  // Fallback rich summary
  return `### **Chirag Sharma — Software Developer**

Chirag is a **Software Developer** at **Sookshum Labs** with **2+ years of experience** specializing in **Adobe Commerce (Open Source)**, Shopify, and modern full-stack web applications.

#### **Quick Highlights:**
* 🛒 **Specialization**: Adobe Commerce (Open Source) custom module development, theme engineering, and performance optimization.
* 🚀 **Key Projects**: BuyNutritionals, BST Group, The Instrument Place, Used Parts Depot.
* 🛠️ **Core Stack**: PHP 8.x, MySQL, Adobe Commerce, Shopify, React.js, JavaScript, Varnish, Redis, OpenSearch.
* 📧 **Contact**: [chirag2001sharma@gmail.com](mailto:chirag2001sharma@gmail.com) • [LinkedIn](https://www.linkedin.com/in/ch1r4gsh4rm4/)

*💡 You can tap any of the suggested query chips above for in-depth details!*`;
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('chirag'); // 'chirag' | 'general'
  const [copiedKey, setCopiedKey] = useState(null);

  // Separate conversation streams for each mode
  const [chiragMessages, setChiragMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "👋 Welcome! I am **Chirag's AI Assistant**.\n\nChoose any suggested query below or ask anything about my **Adobe Commerce (Open Source)** expertise, experience at Sookshum Labs, or client projects!"
    }
  ]);

  const [generalMessages, setGeneralMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "👋 Hello! I am **Chirag's AI**, an intelligent assistant engineered by **Chirag Sharma**.\n\nI can help you with anything—coding questions, software architecture, algorithms, or general knowledge. What would you like to explore?"
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const activeMessages = mode === 'chirag' ? chiragMessages : generalMessages;
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeMessages, isOpen, isLoading]);

  // Focus input when opened or mode switched
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, mode]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Copy to clipboard helper
  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }).catch(err => {
      console.error('Clipboard copy failed:', err);
    });
  };

  // Edit previous query: populate input field and focus
  const handleEditQuery = (text) => {
    setInputValue(text);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.selectionStart = inputRef.current.selectionEnd = text.length;
      }
    }, 50);
  };

  // Send message handler
  const handleSendMessage = async (textToSend, instantReply = null) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: query
    };

    setInputValue('');

    // MODE 1: Know more about Chirag -> 100% Instant Ready Response (No external API, zero tokens, 100% reliable)
    if (mode === 'chirag') {
      const replyText = instantReply || getChiragResponse(query);
      const aiMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        text: replyText
      };
      setChiragMessages(prev => [...prev, userMessage, aiMessage]);
      return;
    }

    // MODE 2: Ask about anything -> Connected to AI Service with multi-model fallback
    const newMessages = [...generalMessages, userMessage];
    setGeneralMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.slice(-4),
          mode: 'general'
        })
      });

      const data = await response.json();
      if (response.ok && data.reply) {
        const aiMessage = {
          id: Date.now() + 1,
          sender: 'ai',
          text: data.reply
        };
        setGeneralMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error(data.error || 'Failed to get AI response');
      }
    } catch (err) {
      console.error('Error fetching AI response:', err);
      const aiMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        text: "I encountered a temporary connection issue. Please check your network or try again in a moment."
      };
      setGeneralMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePresetClick = (preset) => {
    handleSendMessage(preset.question, preset.response);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetActiveChat = () => {
    if (mode === 'chirag') {
      setChiragMessages([
        {
          id: 1,
          sender: 'ai',
          text: "Chat refreshed. Choose any query below or ask anything about **Chirag Sharma's** experience, Adobe Commerce (Open Source) expertise, or client projects!"
        }
      ]);
    } else {
      setGeneralMessages([
        {
          id: 1,
          sender: 'ai',
          text: "Chat refreshed. What would you like to ask or explore?"
        }
      ]);
    }
  };

  return (
    <div className="minimal-ai-root">
      {/* Eye-catching Floating Attention Badge */}
      {!isOpen && (
        <div 
          className="ai-attention-badge" 
          onClick={() => setIsOpen(true)}
          role="button"
          tabIndex={0}
        >
          <span className="badge-sparkle">✨</span>
          <span className="badge-text">Ask Chirag's AI anything</span>
          <span className="badge-arrow"></span>
        </div>
      )}

      {/* High-Visibility Attention-Grabbing Floating Trigger Button */}
      <button
        className="attention-ai-trigger"
        onClick={() => setIsOpen(true)}
        aria-label="Ask Chirag's AI"
        title="Ask Chirag's AI"
      >
        <span className="trigger-pulse-ring ring-1"></span>
        <span className="trigger-pulse-ring ring-2"></span>
        <div className="trigger-icon-box">
          <ModernAIIcon size={22} className="trigger-sparkle-icon" />
        </div>
        <div className="trigger-text-group">
          <span className="trigger-main-text">Ask Chirag's AI</span>
          <span className="trigger-sub-status">
            <span className="status-live-dot"></span> Online
          </span>
        </div>
      </button>

      {/* Full-Height & Full-Width Modal Overlay */}
      {isOpen && (
        <div className="minimal-ai-overlay">
          <div className="minimal-ai-container">
            
            {/* Responsive Top Header */}
            <header className="minimal-ai-header">
              <div className="header-top-row">
                {/* Creator Branding */}
                <div className="header-brand">
                  <div className="header-brand-icon">
                    <ModernAIIcon size={18} />
                  </div>
                  <div>
                    <h3 className="brand-title">Chirag's AI</h3>
                    <span className="brand-badge">Built by Chirag Sharma</span>
                  </div>
                </div>

                {/* Controls (Reset + Close) */}
                <div className="minimal-header-controls">
                  <button
                    className="minimal-icon-btn"
                    onClick={resetActiveChat}
                    title="Clear conversation"
                    aria-label="Clear conversation"
                  >
                    <FaRedo size={12} />
                  </button>

                  <button
                    className="minimal-icon-btn close-btn"
                    onClick={() => setIsOpen(false)}
                    title="Close (Esc)"
                    aria-label="Close"
                  >
                    <FaTimes size={15} />
                  </button>
                </div>
              </div>

              {/* Two Option Tabs */}
              <div className="minimal-ai-tabs">
                <button
                  className={`minimal-tab ${mode === 'chirag' ? 'active' : ''}`}
                  onClick={() => setMode('chirag')}
                >
                  <ModernAIIcon size={14} />
                  <span>Know more about Chirag!</span>
                </button>
                <button
                  className={`minimal-tab ${mode === 'general' ? 'active' : ''}`}
                  onClick={() => setMode('general')}
                >
                  <span>Ask about anything</span>
                </button>
              </div>
            </header>

            {/* Sub-header Context Banner */}
            <div className="minimal-ai-subbar">
              {mode === 'chirag' ? (
                <span className="subbar-text">
                  Portfolio Mode • Instant answers regarding Chirag's experience, Adobe Commerce (Open Source) expertise, and projects.
                </span>
              ) : (
                <span className="subbar-text">
                  General AI Assistant Mode • Ask about any topic—from coding and architecture to science and general knowledge.
                </span>
              )}
            </div>

            {/* Predefined Quick Queries Bar (Available in Chirag Mode) */}
            {mode === 'chirag' && (
              <div className="preset-queries-bar">
                <div className="preset-queries-label">
                  <span>💡 Quick questions:</span>
                </div>
                <div className="preset-chips-scroll">
                  {CHIRAG_PRESET_QUERIES.map((preset) => (
                    <button
                      key={preset.id}
                      className="preset-chip-btn"
                      onClick={() => handlePresetClick(preset)}
                      title={preset.question}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Full-Width Messages Stream */}
            <div className="minimal-messages-stream">
              {activeMessages.map((msg) =>
                msg.sender === 'user' ? (
                  <div key={msg.id} className="chat-row user-row">
                    <div className="user-query-container">
                      <div className="user-query-bubble">
                        <p className="user-query-text">{msg.text}</p>
                      </div>
                      <div className="user-query-actions">
                        <button
                          className="query-tool-btn"
                          onClick={() => handleEditQuery(msg.text)}
                          title="Edit this query"
                        >
                          <FaEdit size={11} />
                          <span>Edit</span>
                        </button>
                        <button
                          className="query-tool-btn"
                          onClick={() => handleCopy(msg.text, `user-${msg.id}`)}
                          title="Copy query"
                        >
                          {copiedKey === `user-${msg.id}` ? (
                            <>
                              <FaCheck size={11} className="copy-check" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <FaCopy size={11} />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={msg.id} className="chat-row ai-row">
                    <div className="ai-response-container">
                      <div className="ai-avatar-indicator">
                        <ModernAIIcon size={18} className="ai-sparkle-icon" />
                      </div>
                      <div className="ai-response-content">
                        {/* Rich Markdown Formatted Output */}
                        <div className="markdown-render-area">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                const codeStr = String(children).replace(/\n$/, '');
                                if (!inline) {
                                  const codeId = `code-${msg.id}-${codeStr.slice(0, 15)}`;
                                  return (
                                    <div className="code-block-container">
                                      <div className="code-block-header">
                                        <span className="code-lang-tag">{match ? match[1] : 'code'}</span>
                                        <button
                                          className="code-copy-btn"
                                          onClick={() => handleCopy(codeStr, codeId)}
                                        >
                                          {copiedKey === codeId ? (
                                            <>
                                              <FaCheck size={11} /> Copied
                                            </>
                                          ) : (
                                            <>
                                              <FaCopy size={11} /> Copy code
                                            </>
                                          )}
                                        </button>
                                      </div>
                                      <pre className="code-pre">
                                        <code className={className} {...props}>
                                          {children}
                                        </code>
                                      </pre>
                                    </div>
                                  );
                                }
                                return (
                                  <code className="inline-code-badge" {...props}>
                                    {children}
                                  </code>
                                );
                              },
                              table({ children }) {
                                return (
                                  <div className="table-scroll-wrapper">
                                    <table className="md-table">{children}</table>
                                  </div>
                                );
                              },
                              a({ href, children }) {
                                return (
                                  <a href={href} target="_blank" rel="noopener noreferrer" className="md-link">
                                    {children}
                                  </a>
                                );
                              }
                            }}
                          >
                            {msg.text}
                          </ReactMarkdown>
                        </div>

                        {/* Copy Response Action Button */}
                        <div className="ai-response-footer">
                          <button
                            className="response-copy-btn"
                            onClick={() => handleCopy(msg.text, `ai-${msg.id}`)}
                            title="Copy full response"
                          >
                            {copiedKey === `ai-${msg.id}` ? (
                              <>
                                <FaCheck size={12} className="copy-check" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <FaCopy size={12} />
                                <span>Copy response</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}

              {isLoading && (
                <div className="chat-row ai-row">
                  <div className="ai-response-container">
                    <div className="ai-avatar-indicator">
                      <ModernAIIcon size={18} className="ai-sparkle-icon pulse" />
                    </div>
                    <div className="ai-response-content loading-indicator">
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Sticky Full-Width Input Bar */}
            <div className="minimal-input-wrapper">
              <input
                ref={inputRef}
                type="text"
                className="minimal-input-field"
                placeholder={
                  mode === 'chirag'
                    ? "Ask about Chirag's experience, Adobe Commerce, skills, projects..."
                    : "Ask anything (coding, science, architecture, general topics)..."
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <button
                className="minimal-send-btn"
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send query"
              >
                <FaPaperPlane size={14} />
              </button>
            </div>

            <div className="modal-footer-watermark">
              <span>Engineered & Built by <strong>Chirag Sharma</strong></span>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
