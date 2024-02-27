import dotenv from 'dotenv';
import connection from './connection';
dotenv.config();

// Function to create tables
export function createTables() {
  const sqlQueries = [
    `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      student_name VARCHAR(255) UNIQUE NOT NULL,
      parent_name VARCHAR(255),
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

createTables();