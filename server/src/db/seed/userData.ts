import { promisePool } from "../connection";

export async function seedUsers() {
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

  try {
    for (const user of userData) {
      await promisePool.execute(
        'INSERT IGNORE INTO users (username, password_hash) VALUES (?, ?)',
        [user.username, user.password_hash]
      );
    }
    console.log('Users seeded successfully');
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}
