import { NextFunction, Request, Response } from 'express';
import connection from '../../db/connection';
import { RowDataPacket } from 'mysql2';
import { Twilio } from 'twilio';
import { getEnvVariable } from '../../util/index';
import { format } from 'date-fns-tz';
import dotenv from 'dotenv';
dotenv.config();

// Your AccountSID and Auth Token from console.twilio.com
const accountSid = getEnvVariable('TWILIO_ACCOUNT_SID');
const authToken = getEnvVariable('TWILIO_AUTH_TOKEN');
const twilio_phone_number = getEnvVariable('TWILIO_PHONE_NUMBER');

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

    // Respond with success message
    response.json({
      message: `Text message sent successfully. SID: ${sendMessage.sid}`,
    });
  } catch (err: any) {
    console.log(err);
    console.error(`Error sending message: ${err.message}`);
    next(err);
  }
}

// Function to retrieve phone number associated with the student_id from the database
async function getPhoneNumber(studentId: number): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const query = 'SELECT phone_number FROM students WHERE id = ?';
    connection.execute(
      query,
      [studentId],
      (error, results: RowDataPacket[]) => {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            let phoneNumber = results[0].phone_number;
            // Remove any characters besides numbers and trim whitespace at the end
            phoneNumber = phoneNumber.replace(/[^\d]/g, '').trim();
            phoneNumber = '+1' + phoneNumber;
            resolve(phoneNumber);
          } else {
            reject(new Error('Student phone number not found'));
          }
        }
      }
    );
  });
}

async function saveTextMessage(
  studentId: number,
  message: string
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    // Get the current date and time in Pacific Time
    const currentDate = new Date();
    const pacificTime = format(currentDate, 'yyyy-MM-dd HH:mm:ss', {
      timeZone: 'America/Los_Angeles',
    });

    const query =
      'INSERT INTO texts (student_id, date, message) VALUES (?, ?, ?)';

    connection.execute(query, [studentId, pacificTime, message], (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
