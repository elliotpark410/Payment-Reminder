import { seedUsers } from './userData';
import { seedStudents } from './studentData';
import { seedLessons } from './lessonData';
import { seedTexts } from './textData';
import { promisePool } from '../connection';

async function seedDatabase() {
  try {
    await seedUsers();
    await seedStudents();
    await seedLessons();
    await seedTexts();
    console.log('Seed data added successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await promisePool.end();
  }
}

seedDatabase().catch(console.error);
