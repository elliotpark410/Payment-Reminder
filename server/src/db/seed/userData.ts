import { promisePool } from '../connection';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

interface UserData {
  username: string;
  password_hash: string;
}

export async function seedUsers() {
  const userData: UserData[] = [
    {
      username: 'heasuk@gmail.com',
      password_hash: '$2b$08$S/s0jz/8Sb7MQiybFPgJqu6VhVx9bWUuvgmi3lTmCQdr0wLuwVDZe',
    },
    {
      username: 'elliotpark410@gmail.com',
      password_hash: '$2b$08$nUlwMGq3ZgX8U4uQtNLe.OEiOXM1irp0n664l3s7xdjtaHkokQvi.',
    },
  ];

  let insertedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const user of userData) {
    try {
      // Check if user already exists
      const [existingUsers] = await promisePool.execute<RowDataPacket[]>(
        'SELECT id FROM users WHERE username = ?',
        [user.username],
      );

      if (existingUsers.length > 0) {
        console.log(`User ${user.username} already exists. Skipping.`);
        skippedCount++;
        continue;
      }

      // Insert new user
      const [result] = await promisePool.execute<ResultSetHeader>(
        'INSERT INTO users (username, password_hash) VALUES (?, ?)',
        [user.username, user.password_hash],
      );

      if (result.affectedRows > 0) {
        insertedCount++;
        console.log(`Inserted user: ${user.username}`);
      } else {
        console.log(`Failed to insert user: ${user.username}`);
        errorCount++;
      }
    } catch (err) {
      errorCount++;
      console.error(`Error inserting user ${user.username}:`, err);
    }
  }

  console.log(
    `Seeding users completed. Inserted: ${insertedCount}, Skipped: ${skippedCount}, Errors: ${errorCount}`,
  );

  if (errorCount > 0) {
    throw new Error(`${errorCount} errors occurred while seeding users`);
  }
}

export async function seedUsersWrapper() {
  try {
    await seedUsers();
    console.log('Users seeding completed successfully');
  } catch (err) {
    console.error('Error in seedUsers:', err);
    throw err; // Re-throw the error for the calling function to handle
  }
}
