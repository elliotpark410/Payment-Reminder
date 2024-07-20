import mysql from 'mysql2/promise';
import { getEnvVariable } from '../util/index';
import dotenv from 'dotenv';
dotenv.config();

async function addTables() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: getEnvVariable('DB_HOST'),
      user: getEnvVariable('DB_USER'),
      password: getEnvVariable('DB_PASSWORD'),
      database: getEnvVariable('DB_DATABASE'),
      multipleStatements: true,
    });

    console.log('Connected to database');

    const sqlQueries = [
      `
      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        student_name VARCHAR(255) UNIQUE NOT NULL,
        parent_name VARCHAR(255),
        phone_number VARCHAR(20),
        email VARCHAR(255),
        subscription_price INT UNSIGNED,
        subscription_number INT UNSIGNED,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at DATE NULL DEFAULT NULL,
        inactive BOOLEAN DEFAULT FALSE
      )`,

      `CREATE TABLE IF NOT EXISTS lessons (
        id SERIAL PRIMARY KEY,
        student_id BIGINT UNSIGNED NOT NULL,
        date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES students(id)
        ON DELETE CASCADE
      )`,

      `CREATE TABLE IF NOT EXISTS resets (
        id SERIAL PRIMARY KEY,
        student_id BIGINT UNSIGNED NOT NULL,
        date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES students(id)
        ON DELETE CASCADE
      )`,

      `CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        student_id BIGINT UNSIGNED NOT NULL,
        date DATE,
        amount BIGINT UNSIGNED NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES students(id)
        ON DELETE CASCADE
      )`,

      `CREATE TABLE IF NOT EXISTS texts (
        id SERIAL PRIMARY KEY,
        student_id BIGINT UNSIGNED NOT NULL,
        date DATE,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES students(id)
        ON DELETE CASCADE
      )`,

      `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,
    ];

    for (const sql of sqlQueries) {
      await connection.query(sql);
      console.log('Table created or already exists');
    }
  } catch (error) {
    console.error('Error in table creation:', error);
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (err) {
        console.error('Error closing database connection:', err);
      }
    }
  }
}

addTables().catch((error) => {
  console.error('Failed to add tables:', error);
  process.exit(1);
});
