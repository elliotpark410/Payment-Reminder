import connection from '../connection';

export async function seedTexts() {
  const textsData = [
    // Insert text data here
    {
      student_name: 'Leah Feigenbaum',
      date: '2024-02-23',
      message: 'Hello',
    },
  ];

  for (const text of textsData) {
    await connection.query('INSERT IGNORE INTO texts SET ?', text);
  }
}
