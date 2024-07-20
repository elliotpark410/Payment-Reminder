import mysql from 'mysql2/promise';
import { seedUsers } from './userData';
import { seedStudents } from './studentData';
import { seedLessons } from './lessonData';
import { seedTexts } from './textData';
import { getEnvVariable } from '../../util/index';

async function seedDatabase() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: getEnvVariable('DB_HOST'),
      user: getEnvVariable('DB_USER'),
      password: getEnvVariable('DB_PASSWORD'),
      database: getEnvVariable('DB_DATABASE'),
      multipleStatements: true,
    });

    console.log('Connected to database');

    await seedUsers();
    await seedStudents();
    await seedLessons();
    await seedTexts();
    console.log('Seed data added successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (err) {
        console.error('Error closing database connection:', err);
      }
    }
  }
}

seedDatabase().catch((error) => {
  console.error('Failed to seed database:', error);
  process.exit(1);
});
