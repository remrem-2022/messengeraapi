const axios = require('axios');

const PAGE_ACCESS_TOKEN = 'EAAOkXLOBGJABOynY5VbeFcllAHiT2eYaOJfqbUinPk2xixjqFFaLqjQ71aCXLohGhZASnDdgA3J2czIUxWZBIPoG7lLmZALxSYtOgD0iK4tebCUaZANZCBwKkDnMdEfCDV12NgmE3ng7IL6YgGF01j6oQCxu9odCSqIK3eKPIXxAZALNAZAMI6ZC19WAeOLMP6ZB61QZDZD';

const sendMessage = async (recipientId, messageText) => {
  const url = `https://graph.facebook.com/v11.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
  const messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  try {
    const response = await axios.post(url, messageData);
    console.log('Message sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending message:', error.response ? error.response.data : error.message);
  }
};

// Replace 'RECIPIENT_ID' with the recipient's PSID (Page Scoped ID)
sendMessage('RECIPIENT_ID', 'Hello, this is a test message!');
