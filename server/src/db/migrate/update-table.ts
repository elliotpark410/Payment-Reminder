import mysql from 'mysql2/promise';
import { getEnvVariable } from '../../util/index';
import dotenv from 'dotenv';
dotenv.config();

async function updateTable() {
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

    // ENTER SQL QUERY HERE
    const sqlQuery = `ALTER TABLE students DROP COLUMN parent_email`;
    await connection.query(sqlQuery);
    console.log('Updated table successfully');
  } catch (error) {
    console.error('Error in table update:', error);
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

updateTable().catch((error) => {
  console.error('Failed to update table:', error);
  process.exit(1);
});
