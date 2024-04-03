import { NextFunction, Request, Response } from "express";
import connection from '../../db/connection';
import { RowDataPacket } from 'mysql2';
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

    const phoneNumber = await getPhoneNumber(student_id);

    // Send text message using Twilio
    const sendMessage = await twilioClient.messages.create({
      body: message,
      to: phoneNumber,
      from: twilio_phone_number,
    });

    // Save the sent text message to the database
    await saveTextMessage(student_id, message);

    console.log("MESSAGE: ", sendMessage)

    // Respond with success message
    response.json({ message: `Text message sent successfully. SID: ${sendMessage.sid}` });
  } catch (err: any) {
    console.log(err)
    console.error(`Error sending message: ${err.message}`);
    next(err);
  }
}

// Function to retrieve phone number associated with the student_id from the database
async function getPhoneNumber(studentId: number): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const query = 'SELECT phone_number FROM students WHERE id = ?';
    connection.execute(query, [studentId], (error, results: RowDataPacket[]) => {
      if (error) {
        reject(error);
      } else {
        if (results.length > 0) {
          let phoneNumber = results[0].phone_number;
          // Remove dashes and whitespace
          phoneNumber = phoneNumber.replace(/-|\s/g, '');
          // Prepend +1 to the phone number
          phoneNumber = '+1' + phoneNumber;
          resolve(phoneNumber);
        } else {
          reject(new Error("Student not found"));
        }
      }
    });
  });
}

// Function to save the sent text message to the database
async function saveTextMessage(studentId: number, message: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const query = 'INSERT INTO texts (student_id, date, message) VALUES (?, NOW(), ?)';

    connection.execute(query, [studentId, message], (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
