import connection from '../connection';

export function seedLessons() {
  const lessonsData = [
    {
      student_id: 1,
      lesson_date: '2024-02-20',
    },
    {
      student_id: 17,
      lesson_date: '2024-03-25',
    },
  ];

  for (const lesson of lessonsData) {
    connection.query('INSERT IGNORE INTO lessons SET ?', lesson);
  }
}
