import connection from '../config/database';

// Function to insert sample data into tables
function insertData() {
  const sql = `
    INSERT INTO users (username, email) VALUES
    ('user1', 'user1@example.com'),
    ('user2', 'user2@example.com')
  `;

  connection.query(sql, (err) => {
    if (err) throw err;
    console.log('Sample data inserted successfully');
    connection.end();
  });
}