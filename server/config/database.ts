import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// Configuration for your MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'payment_reminder',
  port: 3306,
});

// Function to create database if it doesn't exist
function createDatabase() {
  connection.query(`CREATE DATABASE IF NOT EXISTS payment_reminder`, (err) => {
    if (err) throw err;
    console.log('Database created or already exists');
    createTables();
  });
}

// Function to create tables
function createTables() {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL
    )
  `;

  connection.query(sql, (err) => {
    if (err) throw err;
    console.log('Table created or already exists');
  });
}

// Connect to MySQL and initialize the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
  createDatabase();
});

export default connection;
