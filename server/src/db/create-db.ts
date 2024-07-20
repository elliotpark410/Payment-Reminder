import dotenv from 'dotenv';
import { getEnvVariable } from '../util/index';
import mysql from 'mysql2/promise';
dotenv.config();

const database_name = getEnvVariable('DB_DATABASE');

async function createDatabase() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: getEnvVariable('DB_HOST'),
      user: getEnvVariable('DB_USER'),
      password: getEnvVariable('DB_PASSWORD'),
      multipleStatements: true,
    });

    console.log('Connected to MySQL server');

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${database_name}`);
    console.log('Database created or already exists');

    await connection.query(`USE ${database_name}`);
    console.log(`Now using ${database_name} database`);
  } catch (error) {
    console.error('Error in database creation:', error);
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

createDatabase().catch((error) => {
  console.error('Failed to create database:', error);
  process.exit(1);
});
