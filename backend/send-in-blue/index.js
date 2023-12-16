const axios = require('axios');

const sendMail = async (to, subject, htmlContent) => {
  console.log({ to, subject, htmlContent });
  const data = {
    sender: {
      name: 'no reply',
      email: process.env.EMAIL
    },
    to,
    subject,
    htmlContent
  };

  try {
    const response = await axios.post(process.env.SEND_IN_BLUE_URL, data, {
      headers: {
        'Accept': 'application/json',
        'API-Key': process.env.SEND_IN_BLUE_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    // Handle successful response (if needed)
    console.log('Email sent successfully:', response.data);
    return response.data; // Return the response if necessary
  } catch (error) {
    // Handle errors
    console.error('Error sending email:', error);
    throw new Error('Failed to send email'); // Or handle errors based on specific cases
  }
};

module.exports = { sendMail };
