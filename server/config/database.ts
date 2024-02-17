import { Pool } from "pg";

// Create a new Pool instance for managing connections to the database
const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'payment_reminder',
  password: 'password',
  port: 5432, 
});

// Export the pool instance for use in other parts of the application
export default pool;