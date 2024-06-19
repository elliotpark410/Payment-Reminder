import connection from "../connection";

export function seedLessons() {
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

  for (const lesson of lessonsData) {
    connection.query('INSERT IGNORE INTO lessons SET ?', lesson, (err) => {
      if (err) {
        console.error('Error inserting lesson:', err);
      }
    });
  }
}
