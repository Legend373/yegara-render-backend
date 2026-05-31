const fetch = require('node-fetch')

const sendEmail = async (options) => {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL;
  const SENDER_NAME = process.env.BREVO_SENDER_NAME || 'Yegara System';

  // Validate configuration
  if (!BREVO_API_KEY || !SENDER_EMAIL) {
    console.error('❌ Missing Brevo credentials. Set BREVO_API_KEY and BREVO_SENDER_EMAIL.');
    // Don't throw - let registration proceed but log the error
    return { success: false, error: 'Email service not configured' };
  }

  const payload = {
    sender: {
      name: SENDER_NAME,
      email: SENDER_EMAIL,
    },
    to: [
      {
        email: options.email,
      },
    ],
    subject: options.subject,
    htmlContent: options.html || options.message,
  };

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Brevo API Error:', result);
      throw new Error(`Brevo API Error: ${result.message || JSON.stringify(result)}`);
    }

    console.log(`✅ Email sent successfully to ${options.email}`);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('❌ Email send failed:', error.message);
    // Don't throw - registration can still succeed without email
    return { success: false, error: error.message };
  }
};

module.exports = sendEmail;