import dotenv from 'dotenv';
dotenv.config();

// Your AccountSID and Auth Token from console.twilio.com
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_TEST_AUTH_TOKEN;
const twilio_phone_number = process.env.TWILIO_PHONE_NUMBER;

const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'Hello from twilio-node',
    to: '+19495335643', // Text your number
    from: twilio_phone_number, // From a valid Twilio number
  })
  .then((message: any) => console.log(`Message sent successfully. SID: ${message.sid}`))
  .catch((error: Error)  => console.error(`Error sending message: ${error.message}`));