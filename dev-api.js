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

  // Only allow POST requests targeting '/api/send'
  if (req.method !== 'POST' || req.url !== '/api/send') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
    return;
  }

  // Collect the request body stream data
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', async () => {
    try {
      // Parse the JSON request body
      const { name, email, message } = JSON.parse(body);

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
          from: 'Portfolio Contact Form <onboarding@resend.dev>',
          to: [toEmail],
          reply_to: email, // Allows the user to click "reply" in their email client to respond to the sender
          subject: `New submission from ${name}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #030303; padding: 40px 20px; color: #f3f4f6; margin: 0;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #0a0a0a; border: 1px solid #1f2937; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);">
                <!-- Gradient Header -->
                <div style="background: linear-gradient(135deg, #1e1b4b 0%, #030712 100%); padding: 30px; border-bottom: 1px solid #1f2937; text-align: center;">
                  <h2 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">New Portfolio Submission</h2>
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
                    <h4 style="margin: 0 0 10px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af; font-weight: 600;">Message Body</h4>
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
