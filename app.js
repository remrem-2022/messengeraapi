const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const axios = require('axios')
app.use(bodyParser.json());

const VERIFY_TOKEN = '1234';
const PAGE_ACCESS_TOKEN = 'EAAOkXLOBGJABOynY5VbeFcllAHiT2eYaOJfqbUinPk2xixjqFFaLqjQ71aCXLohGhZASnDdgA3J2czIUxWZBIPoG7lLmZALxSYtOgD0iK4tebCUaZANZCBwKkDnMdEfCDV12NgmE3ng7IL6YgGF01j6oQCxu9odCSqIK3eKPIXxAZALNAZAMI6ZC19WAeOLMP6ZB61QZDZD';

// Handle webhook verification
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token === VERIFY_TOKEN) {
    console.log('WEBHOOK_VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Handle incoming messages
app.post('/webhook', (req, res) => {
  const body = req.body;

  if (body.object === 'page') {
    body.entry.forEach(entry => {
      const webhookEvent = entry.messaging[0];
      console.log(webhookEvent);

      const senderId = webhookEvent.sender.id;
      // const message = webhookEvent.message.text;

      // Send a reply
      sendMessage(senderId, 'Hello! This is an automated response.');
    });

    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

// Function to send a message
const sendMessage = (recipientId, messageText) => {
  const url = `https://graph.facebook.com/v11.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
  const messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  axios.post(url, messageData)
    .then(response => {
      console.log('Message sent successfully:', response.data);
    })
    .catch(error => {
      console.error('Error sending message:', error.response ? error.response.data : error.message);
    });
};

app.listen(3005, () => {
  console.log('Server is running on port 3005');
});
