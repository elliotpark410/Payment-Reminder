import dotenv from 'dotenv';
import mysql from 'mysql2';

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

  // Function to drop the database
  connection.query(`DROP DATABASE IF EXISTS payment_reminder`, (dropDbErr) => {
    if (dropDbErr) {
      console.error('Error dropping database:', dropDbErr);
      throw dropDbErr;
    }
    console.log('Database dropped successfully or did not exist');
    connection.end();
  });
});
