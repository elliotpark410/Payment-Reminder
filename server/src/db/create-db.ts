import dotenv from "dotenv";
import mysql from "mysql2";
dotenv.config();

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
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
  connection.query(`CREATE DATABASE IF NOT EXISTS payment_reminder`, (createDbErr) => {
    if (createDbErr) {
      console.error('Error creating database:', createDbErr);
      throw createDbErr;
    }
    console.log('Database created or already exists');
    // Optional: Ensure that you select the created database to avoid "unknown database" errors
    connection.changeUser({ database: 'payment_reminder' }, (changeDbErr) => {
      if (changeDbErr) {
        console.error('Error changing to created database:', changeDbErr);
        throw changeDbErr;
      }
      console.log('Now using payment_reminder database');
      connection.end();
    });
  });
});
