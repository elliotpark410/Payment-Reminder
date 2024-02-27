import { seedUsers } from './userData';
import { seedLessons } from './lessonData';
import { seedTexts } from './textData';
import connection from '../connection';

async function seedDatabase() {
  seedUsers();
  seedLessons();
  seedTexts();
  console.log('Seed data added successfully');
  connection.end();
}

seedDatabase().catch(console.error);
