import dotenv from 'dotenv';
import { getEnvVariable } from '../util/index';
import mysql from 'mysql2';
dotenv.config();

const database_name = getEnvVariable('DB_DATABASE');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: getEnvVariable('DB_HOST'),
  user: getEnvVariable('DB_USER'),
  password: getEnvVariable('DB_PASSWORD'),
  multipleStatements: true, // Allows running multiple SQL statements in a single query
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL server:', err);
    throw err;
  }
  console.log('Connected to MySQL server');

  // Function to create a database if it doesn't exist
  connection.query(`CREATE DATABASE IF NOT EXISTS ${database_name}`, (createDbErr) => {
    if (createDbErr) {
      console.error('Error creating database:', createDbErr);
      throw createDbErr;
    }
    console.log('Database created or already exists');
    // Optional: Ensure that you select the created database to avoid "unknown database" errors
    connection.changeUser({ database: `${database_name}` }, (changeDbErr) => {
      if (changeDbErr) {
        console.error('Error changing to created database:', changeDbErr);
        throw changeDbErr;
      }
      console.log(`Now using ${database_name} database`);
      connection.end();
    });
  });
});
