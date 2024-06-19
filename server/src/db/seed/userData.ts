import connection from "../connection";

export function seedUsers() {
  const userData = [
    {
      username: 'heasuk@gmail.com',
      password_hash: '$2b$08$S/s0jz/8Sb7MQiybFPgJqu6VhVx9bWUuvgmi3lTmCQdr0wLuwVDZe',
    },
    {
      username: 'elliotpark410@gmail.com',
      password_hash: '$2b$08$nUlwMGq3ZgX8U4uQtNLe.OEiOXM1irp0n664l3s7xdjtaHkokQvi.',
    },
  ];

  for (const user of userData) {
    connection.query('INSERT IGNORE INTO users SET ?', user, (err, results) => {
      if (err) {
        console.error('Error inserting user:', err);
      } else {
        console.log('Inserted user:', results);
      }
    });
  }
}
