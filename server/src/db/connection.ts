import mysql from 'mysql2';
import { getEnvVariable } from '../util/index';
import dotenv from 'dotenv';
dotenv.config();

const host = getEnvVariable('DB_HOST');
console.log("host")
console.log(host)
const user = getEnvVariable('DB_USER');
const password = getEnvVariable('DB_PASSWORD');
const database = getEnvVariable('DB_DATABASE');
const port = Number(getEnvVariable('DB_PORT'));

// Configuration for your MySQL connection
export const connection = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
  port: port,
});

// Connect to MySQL and initialize the database
connection.connect((err) => {
  if (err) throw err;
});

export default connection;
