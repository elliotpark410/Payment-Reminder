import { seedStudents } from './studentData';
import { seedLessons } from './lessonData';
import { seedTexts } from './textData';
import connection from '../connection';

async function seedDatabase() {
  seedStudents();
  seedLessons();
  seedTexts();
  console.log('Seed data added successfully');
  connection.end();
}

seedDatabase().catch(console.error);
