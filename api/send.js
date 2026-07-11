// Vercel Serverless Function handler for sending contact form submissions via Resend
export default async function handler(req, res) {
  // Only allow HTTP POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  // Extract name, email, and message from the request body
  const { name, email, message } = req.body;

  // Validate that all fields are provided
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Retrieve the Resend API Key from Vercel's environment variables
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return res.status(500).json({ error: 'Resend API Key is not configured on the server.' });
  }

  // Retrieve the recipient email address, fallback if not set
  const toEmail = process.env.TO_EMAIL || 'chiragsharmadec@gmail.com';

  try {
    // Send email using Resend's REST API endpoint
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        // Note: For the free onboarding plan, Resend requires the 'from' address to be onboarding@resend.dev
        from: 'Portfolio Contact Form <onboarding@resend.dev>',
        to: [toEmail],
        reply_to: email, // Enable replying directly to the user's provided email address
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

    // Handle any API errors returned by Resend
    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'Failed to send email via Resend' });
    }

    // Return success response to the client
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
