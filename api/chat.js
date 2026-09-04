// Vercel Serverless Function handler for Chirag Sharma's AI Assistant
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow HTTP POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const { messages, mode = 'chirag' } = req.body || {};
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Missing or invalid messages array' });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: 'API key is not configured on the server.',
      fallbackRequired: true
    });
  }

  try {
    let systemInstruction;
    if (mode === 'chirag') {
      systemInstruction = `You are Chirag's AI, an intelligent AI assistant engineered and built by Chirag Sharma for his developer portfolio.
Answer questions about Chirag's expertise, technical background, and projects in a professional, clear format.

Profile of Chirag Sharma:
- Creator & Developer: Chirag Sharma is a Software Developer at Sookshum Labs in Mohali, Punjab (2+ years experience).
- Specialization: Adobe Commerce (Open Source) module & theme development, 3rd party integrations, version upgrades, security patches, caching, performance optimization.
- Stack: Shopify, WordPress, PHP, MySQL, REST APIs, React.js, JavaScript (ES6+), KnockoutJS, jQuery, HTML5, CSS3, Git.
- Featured Projects: BuyNutritionals, BST Group (BST TFS, BST Health), The Instrument Place, Used Parts Depot, Farm Fresh Oils, Unstd Clothing.
- Contact: LinkedIn (https://www.linkedin.com/in/ch1r4gsh4rm4/), GitHub (https://github.com/iamchiragsharma), Email: chirag2001sharma@gmail.com.

Rules:
- If asked who built, created, or trained you, state clearly that you were designed and engineered by Chirag Sharma. Never mention Google, Gemini, OpenAI, or external companies.
- Strictly use the name "Adobe Commerce (Open Source)"—never call it "Magento" or "Magento 2".
- Format responses cleanly with markdown headers, bullet points, or paragraphs.`;
    } else {
      systemInstruction = `You are Chirag's AI, an intelligent and versatile AI assistant created and integrated by Chirag Sharma. Answer any user questions accurately, clearly, and concisely, formatted cleanly with markdown. If asked who built, trained, or created you, state that you were engineered and built by Chirag Sharma. Never mention Gemini or Google.`;
    }

    // Token optimization: send last 4 turns
    const recentMessages = messages.slice(-4);
    const contents = recentMessages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text.trim().slice(0, 1000) }]
    }));

    const candidateModels = ['gemini-3.7-flash', 'gemini-3.6-flash', 'gemini-3.8-flash', 'gemini-3.5-flash'];
    let reply = null;
    let lastError = null;

    for (const model of candidateModels) {
      try {
        const endpointUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(endpointUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemInstruction }] },
            contents,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1000,
            }
          })
        });

        const data = await response.json();
        if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          reply = data.candidates[0].content.parts[0].text;
          break;
        } else {
          lastError = data.error?.message || `Status ${response.status}`;
          console.warn(`Model ${model} fallback notice: ${lastError}`);
        }
      } catch (err) {
        lastError = err.message;
        console.warn(`Model ${model} fetch notice: ${err.message}`);
      }
    }

    if (reply) {
      return res.status(200).json({ reply, success: true });
    } else {
      console.error('All AI candidate models failed:', lastError);
      return res.status(503).json({
        error: lastError || 'AI service temporarily unavailable. Please try again.'
      });
    }
  } catch (error) {
    console.error('Server error in /api/chat:', error);
    return res.status(500).json({ error: 'Failed to process AI chat request' });
  }
}
