import connection from '../connection';

export function seedUsers() {
  const userData = [
    {
      username: 'heasuk@gmail.com',
      password_hash: 'password1',
    },
    {
      username: 'elliotpark410@gmail.com',
      password_hash: 'password2',
    },
  ];

  for (const user of userData) {
    connection.query('INSERT IGNORE INTO users SET ?', user);
  }
}
