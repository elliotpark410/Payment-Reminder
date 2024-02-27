import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// Configuration for your MySQL connection
export const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'payment_reminder',
  port: 3306,
});

// Connect to MySQL and initialize the database
connection.connect((err) => {
  if (err) throw err;
});

export default connection;
