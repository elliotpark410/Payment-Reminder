import dotenv from 'dotenv';
import connection from './connection';
dotenv.config();

// Function to create tables
export function createTables() {
  const sqlQueries = [
    `
    CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      student_name VARCHAR(255) UNIQUE NOT NULL,
      parent_name VARCHAR(255),
      phone_number VARCHAR(20),
      email VARCHAR(255)
    )`,

    `CREATE TABLE IF NOT EXISTS lessons (
      id SERIAL PRIMARY KEY,
      student_id BIGINT UNSIGNED NOT NULL,
      subscription_price INT UNSIGNED,
      number_of_lessons_in_subscription INT,
      total_number_of_lessons INT UNSIGNED,
      lesson_date DATE,
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
      if (err) throw err;
      console.log('Table created or already exists');
    });
  });
}

createTables();