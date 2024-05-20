import connection from '../connection';

export function seedLessons() {
  const lessonsData = [
    {
      student_id: 17,
      lesson_date: '2024-02-20',
    },
    {
      student_id: 17,
      lesson_date: '2024-03-25',
      reset_lesson_date: '2024-03-26',
    },
    {
      student_id: 17,
      lesson_date: '2024-03-27',
    },
    {
      student_id: 17,
      lesson_date: '2024-03-28',
    },
    {
      student_id: 17,
      lesson_date: '2024-03-29',
    },
  ];

  for (const lesson of lessonsData) {
    connection.query('INSERT IGNORE INTO lessons SET ?', lesson);
  }
}
