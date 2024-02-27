import dotenv from 'dotenv';
import connection from './connection';
dotenv.config();


// Function to create database if it doesn't exist
function createDatabase() {
  connection.query(`CREATE DATABASE IF NOT EXISTS payment_reminder`, (err) => {
    if (err) throw err;
    console.log('Database created or already exists');
  });
}


createDatabase()
