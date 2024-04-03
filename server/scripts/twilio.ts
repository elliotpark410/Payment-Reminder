import { Twilio } from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

// Your AccountSID and Auth Token from console.twilio.com
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio_phone_number = process.env.TWILIO_PHONE_NUMBER;

// Create a Twilio client instance
const twilioClient = new Twilio(accountSid, authToken);

async function handleSendText() {
  try {
    const message = await twilioClient.messages
    .create({
      body: 'Hello, test #2 -EP',
      to: '+19495335643',
      from: twilio_phone_number,
    })

    console.log("MESSAGE: ", message)

    console.log(`Message sent successfully. SID: ${message.sid}`);
  } catch (error: any) {
    console.log("ERROR: ", error)
    console.error(`Error sending message: ${error.message}`);
  }
}

handleSendText()