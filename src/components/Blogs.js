import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Blogs.css';

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
    content: `WordPress with WooCommerce powers 30% of online stores. Build a complete e-commerce solution that's flexible and cost-effective.`,
    date: '2024-10-20',
    likes: 0,
    comments: []
  },
  // --- 2026 Trending Topics ---
  // Magento 2 Blogs
  {
    id: 16,
    title: 'Edge Computing in Magento 2: Driving Millisecond Latency in 2026',
    excerpt: 'How moving Magento rendering to the edge transforms global e-commerce performance.',
    category: 'Magento 2',
    content: `With the adoption of edge computing, Magento 2 architectures are seeing sub-100ms response times globally. By pushing dynamic content generation to edge nodes, you can drastically reduce origin server load and provide a frictionless checkout experience.`,
    date: '2026-05-08',
    likes: 0,
    comments: []
  },
  {
    id: 17,
    title: 'Hyper-Personalization with Magento 2\'s Latest Generative AI Integrations',
    excerpt: 'Leverage LLMs directly in your Magento 2 backend for real-time customer journeys.',
    category: 'Magento 2',
    content: `Static rules are dead. The new standard for Magento 2 involves real-time generative AI that curates products, generates personalized product descriptions on the fly, and predicts churn with 95% accuracy.`,
    date: '2026-05-02',
    likes: 0,
    comments: []
  },
  {
    id: 18,
    title: 'AR/VR Product Try-ons: Implementing WebXR in Magento 2 Stores',
    excerpt: 'Bring the physical store to the browser with WebXR integration in Magento 2.',
    category: 'Magento 2',
    content: `Spatial computing has reached the browser. We explore how to implement native WebXR APIs in your Magento storefront, allowing customers to try on clothing or place furniture in their living rooms natively without an app.`,
    date: '2026-04-25',
    likes: 0,
    comments: []
  },
  {
    id: 19,
    title: 'Magento 2 + Web3: Accepting Crypto and Managing NFT Loyalty Programs',
    excerpt: 'How to securely implement blockchain technologies into your Magento ecosystem.',
    category: 'Magento 2',
    content: `Crypto payments are mainstream. Discover how to integrate Web3 wallets securely in the Magento 2 checkout and use NFTs as token-gated access for exclusive VIP loyalty tiers.`,
    date: '2026-04-18',
    likes: 0,
    comments: []
  },
  {
    id: 20,
    title: 'The Rise of Composable Commerce: Magento 2 Microservices in 2026',
    excerpt: 'Deconstructing the monolith: Using Magento 2 as a pure headless microservice.',
    category: 'Magento 2',
    content: `Enterprise stores are moving past monolithic architectures. Learn how to decouple Magento 2's inventory, pricing, and checkout into individual microservices that scale independently.`,
    date: '2026-04-10',
    likes: 0,
    comments: []
  },
  // Shopify Blogs
  {
    id: 21,
    title: 'Shopify Checkout Extensibility: Building Advanced Customizations in 2026',
    excerpt: 'Move beyond liquid edits with Shopify\'s powerful new Checkout UI Extensions.',
    category: 'Shopify',
    content: `With checkout.liquid fully deprecated, mastering Checkout Extensibility is non-negotiable. Learn how to build complex B2B logic and custom upsell apps directly into the native Shopify checkout flow safely.`,
    date: '2026-05-05',
    likes: 0,
    comments: []
  },
  {
    id: 22,
    title: 'Shopify Magic & GenAI: Automating Your Entire Storefront',
    excerpt: 'How Shopify\'s built-in AI is replacing manual store management.',
    category: 'Shopify',
    content: `From automatically adjusting pricing based on market trends to generating localized landing pages in 50 languages, Shopify Magic has evolved. Here is how to automate 80% of your store's operations.`,
    date: '2026-04-28',
    likes: 0,
    comments: []
  },
  {
    id: 23,
    title: 'Omnichannel 2.0: Integrating Shopify with Metaverse Storefronts',
    excerpt: 'Expand your sales channels into virtual worlds with Shopify\'s spatial commerce APIs.',
    category: 'Shopify',
    content: `Social commerce has expanded into virtual spaces. Learn how to sync your Shopify inventory directly into popular metaverse platforms to sell digital twins alongside physical products.`,
    date: '2026-04-20',
    likes: 0,
    comments: []
  },
  {
    id: 24,
    title: 'Sustainable E-commerce: Carbon Tracking and Offsetting Apps on Shopify',
    excerpt: 'Meet 2026 consumer demands by making your Shopify store carbon-neutral.',
    category: 'Shopify',
    content: `Sustainability is the #1 conversion driver for Gen Z. We review the best Shopify apps for calculating supply chain carbon footprints and offering customers automated offset options at checkout.`,
    date: '2026-04-12',
    likes: 0,
    comments: []
  },
  {
    id: 25,
    title: 'Shopify B2B Enhancements: The Ultimate Guide to Wholesale in 2026',
    excerpt: 'Utilizing Shopify\'s native B2B features to replace legacy wholesale portals.',
    category: 'Shopify',
    content: `Shopify has doubled down on wholesale. Discover how to set up company profiles, complex payment terms, and custom catalogs without needing a separate Plus store or third-party portal.`,
    date: '2026-04-05',
    likes: 0,
    comments: []
  },
  // WordPress Blogs
  {
    id: 26,
    title: 'WordPress 6.8 & Beyond: AI-Driven Full Site Generation',
    excerpt: 'Generate entire themes, layouts, and content using prompt-based site building.',
    category: 'WordPress',
    content: `The Block Editor has integrated native AI. Learn how to use text prompts to generate fully responsive, customized block themes in seconds, bypassing manual CSS adjustments entirely.`,
    date: '2026-05-07',
    likes: 0,
    comments: []
  },
  {
    id: 27,
    title: 'Headless WordPress with Next.js 16: The 2026 Performance Stack',
    excerpt: 'Achieve perfect Lighthouse scores by combining WPGraphQL with Next.js 16 App Router.',
    category: 'WordPress',
    content: `The ultimate headless stack has matured. We dive into using WordPress purely as a CMS, leveraging the new Next.js 16 React Server Components to stream data and achieve instant page loads.`,
    date: '2026-04-30',
    likes: 0,
    comments: []
  },
  {
    id: 28,
    title: 'WooCommerce High-Performance Order Storage (HPOS): Benchmarks',
    excerpt: 'Why migrating to HPOS is critical for WooCommerce scaling in 2026.',
    category: 'WordPress',
    content: `Post-meta tables are history. HPOS is now mandatory for high-volume stores. We analyze the 400% performance gains in checkout and dashboard loading speeds after migrating legacy databases.`,
    date: '2026-04-22',
    likes: 0,
    comments: []
  },
  {
    id: 29,
    title: 'Zero-Trust Security for WordPress: Defending Against Next-Gen Threats',
    excerpt: 'Move beyond simple firewalls with Zero-Trust architecture in WordPress.',
    category: 'WordPress',
    content: `With AI-driven attacks on the rise, traditional security plugins aren't enough. Learn how to implement Zero-Trust models, hardware key authentication (Passkeys), and edge-level threat mitigation on WordPress.`,
    date: '2026-04-15',
    likes: 0,
    comments: []
  },
  {
    id: 30,
    title: 'Accessibility First: Automating WCAG 3.0 Compliance in WordPress',
    excerpt: 'Ensure your WordPress site meets the strict new 2026 accessibility standards.',
    category: 'WordPress',
    content: `WCAG 3.0 requires dynamic contrast adjustments and cognitive accessibility. Discover the latest WordPress tools that automatically scan, report, and heal accessibility violations in real-time.`,
    date: '2026-04-08',
    likes: 0,
    comments: []
  }
];

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Load blogs from localStorage or initialize with sample data
    const storedBlogs = localStorage.getItem('blogs');
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    } else {
      setBlogs(sampleBlogs);
      localStorage.setItem('blogs', JSON.stringify(sampleBlogs));
    }
  }, []);

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [blogs]);

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