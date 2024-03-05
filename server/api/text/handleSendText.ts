import { NextFunction, Request, Response } from "express";
import { Twilio } from "twilio";
import dotenv from 'dotenv';
dotenv.config();

// Your AccountSID and Auth Token from console.twilio.com
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio_phone_number = process.env.TWILIO_PHONE_NUMBER;

// Create a Twilio client instance
const twilioClient = new Twilio(accountSid, authToken);

export async function handleSendText(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    // Extract necessary data from request body
    const { student_id, message } = request.body;

    // Retrieve phone number associated with the student_id from the database
    // Replace this with your database query to get the phone number based on the student_id
    const phoneNumber = await getPhoneNumber(student_id);

    // Send text message using Twilio
    await twilioClient.messages.create({
      body: message,
      from: twilio_phone_number,
      to: phoneNumber,
    });

    // Save the sent text message to the database
    // Implement the logic to save the message to the database
    await saveTextMessage(student_id, message);

    // Respond with success message
    response.json({ message: "Text message sent successfully" });

  } catch (err) {
    console.log(err)
    next(err);
  }
}

// Function to retrieve phone number associated with the student_id from the database
async function getPhoneNumber(studentId: number): Promise<string> {
  // Implement your database query logic here
  // Example: SELECT phone_number FROM students WHERE id = studentId
  // Return the phone number fetched from the database
  return "+1234567890"; // Placeholder phone number
}

// Function to save the sent text message to the database
async function saveTextMessage(studentId: number, message: string): Promise<void> {
  // Implement your database insert logic here
  // Example: INSERT INTO texts (student_id, date, message) VALUES (?, NOW(), ?)
  // Use studentId and message as parameters
}
