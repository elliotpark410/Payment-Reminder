import mysql from 'mysql2';
import { getEnvVariable } from '../../util/index';
import dotenv from 'dotenv';
dotenv.config();

// Ensure we're connected to the correct database
const connection = mysql.createConnection({
  host: getEnvVariable('DB_HOST'),
  user: getEnvVariable('DB_USER'),
  password: getEnvVariable('DB_PASSWORD'),
  database: getEnvVariable('DB_DATABASE'),
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    throw err;
  }

  const sqlQuery = `ALTER TABLE students DROP COLUMN parent_email`;

  connection.query(sqlQuery, (err) => {
    if (err) {
      console.error('Error updating table:', err);
      throw err;
    }
    console.log('Updated table successfully');
  });

  // Close connection
  connection.end();
});
