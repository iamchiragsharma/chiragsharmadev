export const sampleBlogs = [
  {
    id: 1,
    title: 'The Silent Revolution: How Hyvä Themes Saved Magento 2',
    excerpt: 'A deep dive into why Hyvä is replacing the aging Luma frontend and becoming the gold standard for Magento performance.',
    category: 'Magento 2',
    content: `It was early 2021 when the Magento community felt a shift. For years, developers had struggled with the complexity of the Luma and Blank themes—huge bundles of RequireJS, Knockout.js, and thousands of lines of legacy CSS.

## The Problem with the Monolith
Magento 2 was powerful, but its frontend was slow. Achieving a 90+ Lighthouse score felt like a dark art involving massive Varnish configurations and aggressive bundling that often broke more than it fixed.

## Enter Willem Wigman and Hyvä
When Willem Wigman introduced Hyvä, it wasn't just a new theme; it was a declaration of simplicity. By stripping away the legacy bloat and replacing it with Tailwind CSS and Alpine.js, Hyvä brought modern developer experience back to Magento.

### Why It Matters
Today, Hyvä is the standard. It has single-handedly kept Magento 2 relevant in an era of lightning-fast headless alternatives. For merchants, it means higher conversion rates. For developers, it means joy in coding again.`,
    date: '2026-05-10',
    likes: 124,
    comments: []
  },
  {
    id: 2,
    title: 'Beyond the Monolith: My Journey into Composable Commerce',
    excerpt: 'Scaling Magento 2 by decoupling the frontend and using Alokai (Vue Storefront) for a truly headless experience.',
    category: 'Magento 2',
    content: `The term "Headless" used to be a buzzword. In 2026, it's a necessity for enterprise-level scale. This is the story of how we took a $50M/year retailer from a monolithic Magento setup to a composable architecture.

## The Breaking Point
Our client was hitting limits. During Black Friday, the sheer weight of rendering pages on the server was killing the origin. We needed a frontend that could scale independently of the backend logic.

## The Solution: Alokai + Magento GraphQL
We chose Alokai (formerly Vue Storefront) for its robust integration with Magento's GraphQL API. By treating Magento purely as a commerce engine—handling inventory, prices, and orders—and moving the UI to a modern React-based edge-rendered frontend, we achieved true separation of concerns.

### The Result
- 400% increase in checkout speed.
- Seamless integration with third-party CMS (Contentful) and Search (Algolia).
- Zero downtime during the biggest sales events of the year.`,
    date: '2026-05-05',
    likes: 89,
    comments: []
  },
  {
    id: 3,
    title: 'The Ghost in the Machine: Debugging Checkout at 3 AM',
    excerpt: 'A high-stakes story of a database deadlock that nearly brought down a global fashion brand during a celebrity drop.',
    category: 'Magento 2',
    content: `The notification sound at 3:14 AM is never good. "Checkout failure rate: 85%." One of the world's largest fashion brands was in the middle of a limited celebrity drop, and Magento was screaming.

## The Investigation
We dove into the MySQL slow query logs. The culprit? A classic database deadlock on the 'sales_flat_quote' tables. Under the massive load of 50,000 concurrent users, Magento's default locking mechanism was choking.

## The Fix
We didn't just restart services. We implemented a custom queueing system for quote updates and moved the session storage from the database to an optimized Redis cluster. We also identified a third-party tax calculation extension that was making blocking API calls during the checkout flow.

### Lessons Learned
Performance isn't just about fast page loads; it's about stability under pressure. If your checkout can't handle the peak, your marketing spend is wasted.`,
    date: '2026-04-28',
    likes: 215,
    comments: []
  },
  {
    id: 4,
    title: 'Architecting for the Unknown: Global Scaling on AWS',
    excerpt: 'How we built a multi-region Magento 2 infrastructure that handles millions of requests with sub-second latency.',
    category: 'Magento 2',
    content: `Building for one country is easy. Building for thirty, with low latency in Tokyo, London, and New York simultaneously? That's where the real architecture begins.

## The Global Challenge
Latency is the enemy of e-commerce. A 100ms delay in New York might be a 2-second delay for a user in Singapore if your server is only in US-East-1.

## The AWS Multi-Region Stack
We implemented a sophisticated stack using:
- **AWS Global Accelerator** to route traffic to the nearest healthy region.
- **Aurora Global Database** for real-time data replication across continents.
- **CloudFront Function** for edge-side localization and currency switching.

### The Global Experience
By architecting for the edge, we ensured that every customer, regardless of location, received a local-like experience. This wasn't just a technical win; it was a massive business win for our client's international expansion.`,
    date: '2026-04-15',
    likes: 156,
    comments: []
  },
  {
    id: 5,
    title: 'The AI Oracle: Integrating Generative Search',
    excerpt: 'Replacing traditional keyword search with LLM-powered discovery to double conversion rates in Magento 2.',
    category: 'Magento 2',
    content: `Traditional search is broken. When a user types "red dress for a summer wedding," they don't just want items with those keywords. They want a curated collection that fits the vibe.

## The Shift to Semantic Search
In late 2025, we integrated a custom Vector Database with Magento 2. Instead of matching text, we started matching intent. Using OpenAI's embeddings, we mapped the entire product catalog into a high-dimensional space.

## The User Experience
Now, users can talk to the search bar. "Find me something that matches these shoes I just bought." The AI understands the context, the style, and the occasion.

### The Conversion Jump
Since implementing Generative Search:
- 45% reduction in "no results found" pages.
- 2x increase in Add-to-Cart from search results.
- A significant boost in average order value through intelligent cross-selling.`,
    date: '2026-04-02',
    likes: 312,
    comments: []
  }
];
