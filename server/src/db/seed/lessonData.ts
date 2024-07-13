import { promisePool } from "../connection";

export async function seedLessons() {
  const lessonsData = [
    {
      student_id: 1,
      date: '2024-02-20',
    },
    {
      student_id: 2,
      date: '2024-03-25',
    },
    {
      student_id: 3,
      date: '2024-03-27',
    },
    {
      student_id: 4,
      date: '2024-03-28',
    },
    {
      student_id: 5,
      date: '2024-03-29',
    },
    {
      student_id: 17,
      date: '2024-03-28',
    },
    {
      student_id: 17,
      date: '2024-03-29',
    },    {
      student_id: 17,
      date: '2024-03-28',
    },
    {
      student_id: 17,
      date: '2024-03-29',
    },    {
      student_id: 17,
      date: '2024-03-28',
    },
    {
      student_id: 17,
      date: '2024-03-29',
    },    {
      student_id: 17,
      date: '2024-03-28',
    },
    {
      student_id: 17,
      date: '2024-03-29',
    },    {
      student_id: 17,
      date: '2024-03-28',
    },
    {
      student_id: 17,
      date: '2024-03-29',
    },    {
      student_id: 17,
      date: '2024-03-28',
    },
    {
      student_id: 17,
      date: '2024-03-29',
    },    {
      student_id: 17,
      date: '2024-03-28',
    },
    {
      student_id: 17,
      date: '2024-03-29',
    },    {
      student_id: 17,
      date: '2024-03-28',
    },
    {
      student_id: 17,
      date: '2024-03-29',
    },    {
      student_id: 17,
      date: '2024-03-28',
    },
    {
      student_id: 17,
      date: '2024-03-29',
    },
  ];

  try {
    for (const lesson of lessonsData) {
      await promisePool.execute(
        'INSERT IGNORE INTO lessons (student_id, date) VALUES (?, ?)',
        [lesson. student_id, lesson.date]
      );
    }
    console.log('Lessons seeded successfully');
  } catch (error) {
    console.error('Error seeding lessons:', error);
    throw error;
  }
}
