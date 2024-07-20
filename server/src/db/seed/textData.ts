import { promisePool } from '../connection';
import { RowDataPacket } from 'mysql2';

interface TextData {
  student_id: number;
  date: string;
  message: string;
}

export async function seedTexts() {
  const textsData: TextData[] = [
    // Insert text data here
    {
      student_id: 2,
      date: '2024-02-23',
      message: 'Hello',
    },
  ];

  let insertedCount = 0;
  let errorCount = 0;

  for (const text of textsData) {
    try {
      // First, check if the student exists
      const [rows] = await promisePool.execute<RowDataPacket[]>(
        'SELECT id FROM students WHERE id = ?',
        [text.student_id],
      );

      if (rows.length === 0) {
        console.warn(`Student with id ${text.student_id} does not exist. Skipping text insertion.`);
        continue;
      }

      // If student exists, proceed with text insertion
      const [result] = await promisePool.execute(
        'INSERT IGNORE INTO texts (student_id, date, message) VALUES (?, ?, ?)',
        [text.student_id, text.date, text.message],
      );

      if ('affectedRows' in result && result.affectedRows > 0) {
        insertedCount++;
        console.log(`Inserted text for student ${text.student_id}`);
      } else {
        console.log(`Text for student ${text.student_id} already exists or no changes made`);
      }
    } catch (err) {
      errorCount++;
      console.error(`Error inserting text for student ${text.student_id}:`, err);
    }
  }

  console.log(`Seeding texts completed. Inserted: ${insertedCount}, Errors: ${errorCount}`);

  if (errorCount > 0) {
    throw new Error(`${errorCount} errors occurred while seeding texts`);
  }
}

// Wrapper function to handle the main error
export async function seedTextsWrapper() {
  try {
    await seedTexts();
    console.log('Texts seeding completed successfully');
  } catch (err) {
    console.error('Error in seedTexts:', err);
    throw err; // Re-throw the error for the calling function to handle
  }
}
