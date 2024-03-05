import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();


const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const port = Number(process.env.DB_PORT);

// Configuration for your MySQL connection
export const connection = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
  port: port,
});

// Connect to MySQL and initialize the database
connection.connect((err) => {
  if (err) throw err;
});

export default connection;
