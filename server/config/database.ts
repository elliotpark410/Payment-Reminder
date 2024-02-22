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
  const sqlQueries = [
    `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      student_name VARCHAR(255) NOT NULL,
      parent_name VARCHAR(255) NOT NULL,
      phone_number VARCHAR(20) NOT NULL,
      subscription_price DECIMAL(10, 2) NOT NULL,
      number_of_lessons_in_subscription INT NOT NULL
    )`,

    `CREATE TABLE IF NOT EXISTS lessons (
      id SERIAL PRIMARY KEY,
      total_number_of_lessons INT NOT NULL,
      user_id INT REFERENCES users(id),
      student_name VARCHAR(255) NOT NULL,
      lesson_date DATE NOT NULL,
      reminder_sent_date DATE NOT NULL
    )`,

    `CREATE TABLE IF NOT EXISTS texts (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id),
      student_name VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      recent_message TEXT NOT NULL
    )`,
  ];

  sqlQueries.forEach((sql) => {
    connection.query(sql, (err) => {
      if (err) throw err;
      console.log('Table created or already exists');
    });
  });
}

// Connect to MySQL and initialize the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
  createDatabase();
});

export default connection;
