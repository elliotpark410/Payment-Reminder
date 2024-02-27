import { seedUsers } from './userData';
import { seedLessons } from './lessonData';
import { seedTexts } from './textData';
import connection from '../connection';

async function seedDatabase() {
  await seedUsers();
  await seedLessons();
  await seedTexts();
  console.log('Seed data added successfully');
  connection.end();
}

seedDatabase().catch(console.error);
