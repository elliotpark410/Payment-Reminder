import mysql from 'mysql2';
import { getEnvVariable } from '../util/index';
import dotenv from 'dotenv';
dotenv.config();

const host = getEnvVariable('DB_HOST');
const user = getEnvVariable('DB_USER');
const password = getEnvVariable('DB_PASSWORD');
const database = getEnvVariable('DB_DATABASE');
const port = Number(getEnvVariable('DB_PORT'));

// Create a connection pool
const poolConfig = {
  host: host,
  user: user,
  password: password,
  database: database,
  port: port,
  connectionLimit: 10, 
  waitForConnections: true,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  connectTimeout: 20000,
};

// Create a connection pool
let pool = mysql.createPool(poolConfig);
export let promisePool = pool.promise();

// Function to check and handle connection
const checkConnection = async () => {
  try {
    await promisePool.query('SELECT 1');
    console.log('MySQL connection is alive');
  } catch (error) {
    console.error('MySQL connection error:', error);
    handleDisconnect();
  }
};

const handleDisconnect = () => {
  console.log('Reconnecting to MySQL...');
  pool.end((err) => {
    if (err) {
      console.error('Error closing MySQL pool:', err);
    }
    // Re-create the pool
    pool = mysql.createPool(poolConfig);
    promisePool = pool.promise(); // Update promisePool with the new pool
    console.log('MySQL reconnected');
  });
};

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    handleDisconnect();
  } else {
    throw err;
  }
});

// Check connection every 30 minutes
setInterval(checkConnection, 30 * 60 * 1000);

process.on('SIGINT', async () => {
  try {
    pool.end();
    console.log('Pool has ended');
    process.exit(0);
  } catch (err) {
    console.error('Error closing pool:', err);
    process.exit(1);
  }
});
