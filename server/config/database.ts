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
      student_name VARCHAR(255) UNIQUE NOT NULL,
      parent_name VARCHAR(255) NOT NULL,
      phone_number VARCHAR(20)
    )`,

    `CREATE TABLE IF NOT EXISTS lessons (
      id SERIAL PRIMARY KEY,
      student_name VARCHAR(255) NOT NULL,
      subscription_price INT UNSIGNED,
      number_of_lessons_in_subscription INT,
      total_number_of_lessons INT UNSIGNED,
      lesson_date DATE,
      FOREIGN KEY (student_name) REFERENCES users(student_name)
    )`,

    `CREATE TABLE IF NOT EXISTS texts (
      id SERIAL PRIMARY KEY,
      student_name VARCHAR(255) NOT NULL,
      date DATE,
      message TEXT,
      FOREIGN KEY (student_name) REFERENCES users(student_name)
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
