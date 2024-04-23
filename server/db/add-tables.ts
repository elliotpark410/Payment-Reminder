import dotenv from 'dotenv';
import mysql from 'mysql2';
dotenv.config();

// Ensure we're connected to the correct database
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: 'payment_reminder', // Connect to the correct database
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    throw err;
  }

  const sqlQueries = [
    `
    CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      student_name VARCHAR(255) UNIQUE NOT NULL,
      parent_name VARCHAR(255),
      phone_number VARCHAR(20),
      email VARCHAR(255),
      subscription_price INT UNSIGNED,
      number_of_lessons_in_subscription INT
    )`,

    `CREATE TABLE IF NOT EXISTS lessons (
      id SERIAL PRIMARY KEY,
      student_id BIGINT UNSIGNED NOT NULL,
      lesson_date DATE,
      reset_lesson_date DATE,
      FOREIGN KEY (student_id) REFERENCES students(id)
      ON DELETE CASCADE
    )`,

    `CREATE TABLE IF NOT EXISTS texts (
      id SERIAL PRIMARY KEY,
      student_id BIGINT UNSIGNED NOT NULL,
      date DATE,
      message TEXT,
      FOREIGN KEY (student_id) REFERENCES students(id)
      ON DELETE CASCADE
    )`,
  ];

  sqlQueries.forEach((sql) => {
    connection.query(sql, (err) => {
      if (err) {
        console.error('Error creating table:', err);
        throw err;
      }
      console.log('Table created or already exists');
    });
  });

  // Close connection once tables are created
  connection.end();
});
