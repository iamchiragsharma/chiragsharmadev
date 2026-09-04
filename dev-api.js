const http = require('http');
const fs = require('fs');
const path = require('path');

// Simple custom dotenv parser to load environment variables from the .env file locally.
// This is used because dev-api.js is run with raw 'node dev-api.js' without the dotenv package.
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      // Strip outer quotes if present
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      process.env[key] = value;
    }
  });
}

// Local request handler simulating the Vercel Serverless environment
const handler = async (req, res) => {
  // Configure CORS headers to allow cross-origin requests from the React dev server (port 3000)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS requests from the browser
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Only allow POST requests targeting '/api/send' or '/api/chat'
  if (req.method !== 'POST' || (req.url !== '/api/send' && req.url !== '/api/chat')) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
    return;
  }

  // Collect the request body stream data
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', async () => {
    try {
      const parsedBody = JSON.parse(body || '{}');

      // Handle AI Chat route
      if (req.url === '/api/chat') {
        const { messages, mode = 'chirag' } = parsedBody;
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Missing or invalid messages array' }));
          return;
        }

        const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
          res.writeHead(503, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            error: 'API key is not configured in .env',
            fallbackRequired: true
          }));
          return;
        }

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

        // Token optimization: limit to last 4 messages and truncate length
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
            const aiResponse = await fetch(endpointUrl, {
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

            const aiData = await aiResponse.json();
            if (aiResponse.ok && aiData.candidates?.[0]?.content?.parts?.[0]?.text) {
              reply = aiData.candidates[0].content.parts[0].text;
              break; // Success!
            } else {
              lastError = aiData.error?.message || `Model ${model} responded with status ${aiResponse.status}`;
              console.warn(`Fallback notice: ${model} failed (${lastError}), trying next available model...`);
            }
          } catch (err) {
            lastError = err.message;
            console.warn(`Fallback notice: ${model} fetch exception (${err.message}), trying next...`);
          }
        }

        if (reply) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ reply, success: true }));
          return;
        } else {
          console.error('All AI candidate models failed:', lastError);
          res.writeHead(503, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: lastError || 'AI service temporarily unavailable. Please try again.' }));
          return;
        }
      }

      // Handle Contact Form (/api/send)
      const { name, email, message } = parsedBody;

      // Simple validation: Name, Email, and Message must all be present
      if (!name || !email || !message) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Missing required fields' }));
        return;
      }

      // Check if Resend API key is configured in the .env file
      const resendApiKey = process.env.RESEND_API_KEY;
      if (!resendApiKey) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Resend API Key is not configured in .env' }));
        return;
      }

      // Read recipient email from .env, or fallback to default email address
      const toEmail = process.env.TO_EMAIL || 'chirag2001sharma@gmail.com';

      // Send request to Resend API using standard HTTP fetch
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`
        },
        body: JSON.stringify({
          // Note: While using the free sandbox/onboarding domain, the 'from' address must be onboarding@resend.dev
          from: 'New Contact Form Query',
          to: [toEmail],
          reply_to: email, // Allows the user to click "reply" in their email client to respond to the sender
          subject: `New submission from ${name}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #030303; padding: 40px 20px; color: #f3f4f6; margin: 0;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #0a0a0a; border: 1px solid #1f2937; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);">
                <!-- Gradient Header -->
                <div style="background: linear-gradient(135deg, #1e1b4b 0%, #030712 100%); padding: 30px; border-bottom: 1px solid #1f2937; text-align: center;">
                  <h2 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Have a look to the new query</h2>
                  <p style="margin: 5px 0 0 0; font-size: 14px; color: #9ca3af;">You received a new message from your website contact form.</p>
                </div>
                
                <!-- Content Body -->
                <div style="padding: 30px;">
                  <!-- Sender Metadata Table -->
                  <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
                    <tr>
                      <td style="padding: 8px 0; font-size: 14px; color: #9ca3af; width: 80px; font-weight: 600;">Sender:</td>
                      <td style="padding: 8px 0; font-size: 14px; color: #ffffff; font-weight: 500;">${name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-size: 14px; color: #9ca3af; font-weight: 600;">Email:</td>
                      <td style="padding: 8px 0; font-size: 14px; color: #8b5cf6; font-weight: 500;">
                        <a href="mailto:${email}" style="color: #8b5cf6; text-decoration: none;">${email}</a>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Styled Quote Block for Message -->
                  <div style="background-color: #111827; border: 1px solid #1f2937; border-radius: 8px; padding: 20px;">
                    <h4 style="margin: 0 0 10px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af; font-weight: 600;">Please look at the visitor's query</h4>
                    <p style="margin: 0; font-size: 15px; color: #e5e7eb; line-height: 1.6; white-space: pre-wrap; font-style: italic;">"${message}"</p>
                  </div>
                </div>
                
                <!-- Footer Section -->
                <div style="background-color: #030303; padding: 20px; text-align: center; border-top: 1px solid #1f2937;">
                  <p style="margin: 0; font-size: 12px; color: #4b5563;">&copy; 2026 Designed & Built by Chirag Sharma.</p>
                </div>
              </div>
            </div>
          `
        })
      });

      const data = await response.json();

      // Handle Resend API error responses (e.g. invalid key, wrong recipient address in sandbox)
      if (!response.ok) {
        res.writeHead(response.status, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: data.message || 'Failed to send email via Resend' }));
        return;
      }

      // Return success status and email reference data to the client
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data }));
    } catch (error) {
      console.error('Error in dev-api:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
  });
};

// Create the HTTP server and bind to 127.0.0.1:3001
const server = http.createServer(handler);
const PORT = 3001;
server.listen(PORT, '127.0.0.1', () => {
  console.log(`Dev API server running at http://127.0.0.1:${PORT}`);
});
