import connection from '../connection';

export function seedLessons() {
  const lessonsData = [
    {
      student_id: 1,
      subscription_price: 100,
      number_of_lessons_in_subscription: 13,
      total_number_of_lessons: 26,
      lesson_date: '2024-02-20',
    },
  ];

  for (const lesson of lessonsData) {
    connection.query('INSERT IGNORE INTO lessons SET ?', lesson);
  }
}
