import dotenv from 'dotenv';
import { getEnvVariable } from '../util/index';
import mysql from 'mysql2/promise';

dotenv.config();

const database_name = getEnvVariable('DB_DATABASE');

async function dropDatabase() {
  let connection;

  try {
    // Create a connection to the MySQL server
    connection = await mysql.createConnection({
      host: getEnvVariable('DB_HOST'),
      user: getEnvVariable('DB_USER'),
      password: getEnvVariable('DB_PASSWORD'),
      multipleStatements: true, // Allows running multiple SQL statements in a single query
    });

    console.log('Connected to MySQL server');

    // Drop the database if it exists
    await connection.query(`DROP DATABASE IF EXISTS ${database_name}`);
    console.log('Database dropped successfully or did not exist');
  } catch (error) {
    console.error('Error occurred:', error);
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.end();
        console.log('MySQL connection closed');
      } catch (err) {
        console.error('Error closing MySQL connection:', err);
      }
    }
  }
}

async function main() {
  try {
    await dropDatabase();
    console.log('Database drop operation completed successfully');
  } catch (error) {
    console.error('Failed to drop database:', error);
    process.exit(1);
  }
}

main();
