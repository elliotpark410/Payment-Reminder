import { promisePool } from '../connection';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

interface LessonData {
  student_id: number;
  date: string;
}

export async function seedLessons() {
  const lessonsData: LessonData[] = [
    {
      student_id: 1,
      date: '2024-07-20',
    },
    {
      student_id: 2,
      date: '2024-07-15',
    },
    {
      student_id: 3,
      date: '2024-07-19',
    },
    {
      student_id: 4,
      date: '2024-07-14',
    },
    {
      student_id: 5,
      date: '2024-07-14',
    },
    {
      student_id: 6,
      date: '2024-07-14',
    },
    {
      student_id: 7,
      date: '2024-07-14',
    },
    {
      student_id: 8,
      date: '2024-07-14',
    },
    {
      student_id: 9,
      date: '2024-07-14',
    },
    {
      student_id: 10,
      date: '2024-07-14',
    },
    {
      student_id: 11,
      date: '2024-07-14',
    },
    {
      student_id: 12,
      date: '2024-07-14',
    },
    {
      student_id: 13,
      date: '2024-07-13',
    },
    {
      student_id: 14,
      date: '2024-07-13',
    },
    {
      student_id: 17,
      date: '2024-07-13',
    },
    {
      student_id: 15,
      date: '2024-07-13',
    },
    {
      student_id: 16,
      date: '2024-07-13',
    },
    {
      student_id: 17,
      date: '2024-07-13',
    },
    {
      student_id: 18,
      date: '2024-07-13',
    },
    {
      student_id: 19,
      date: '2024-07-12',
    },
    {
      student_id: 20,
      date: '2024-07-12',
    },
  ];

  let insertedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const lesson of lessonsData) {
    try {
      // Check if student exists
      const [students] = await promisePool.execute<RowDataPacket[]>(
        'SELECT id FROM students WHERE id = ?',
        [lesson.student_id],
      );

      if (students.length === 0) {
        console.warn(`Student with id ${lesson.student_id} does not exist. Skipping lesson.`);
        skippedCount++;
        continue;
      }

      // Insert lessons
      const [result] = await promisePool.execute<ResultSetHeader>(
        'INSERT INTO lessons (student_id, date) VALUES (?, ?)',
        [lesson.student_id, lesson.date],
      );

      if (result.affectedRows > 0) {
        insertedCount++;
        console.log(`Inserted lesson for student ${lesson.student_id} on ${lesson.date}`);
      } else {
        console.log(`Failed to insert lesson for student ${lesson.student_id} on ${lesson.date}`);
        errorCount++;
      }
    } catch (err) {
      errorCount++;
      console.error(
        `Error inserting lesson for student ${lesson.student_id} on ${lesson.date}:`,
        err,
      );
    }
  }

  console.log(
    `Seeding lessons completed. Inserted: ${insertedCount}, Skipped: ${skippedCount}, Errors: ${errorCount}`,
  );

  if (errorCount > 0) {
    throw new Error(`${errorCount} errors occurred while seeding lessons`);
  }
}

export async function seedLessonsWrapper() {
  try {
    await seedLessons();
    console.log('Lessons seeding completed successfully');
  } catch (err) {
    console.error('Error in seedLessons:', err);
    throw err; // Re-throw the error for the calling function to handle
  }
}
