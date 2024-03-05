// Your AccountSID and Auth Token from console.twilio.com
const accountSid = 'ACfc388d6a7d8cd85846bf7e543f88e49c';
const authToken = '9e745e2ffb942b31a248b6f06f84f3e4';

const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'Hello from twilio-node',
    to: '+19495335643', // Text your number
    from: '+18557971437', // From a valid Twilio number
  })
  .then((message: any) => console.log(message.sid));