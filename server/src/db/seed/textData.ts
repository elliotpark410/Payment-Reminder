import { promisePool } from "../connection";

export async function seedTexts() {
  const textsData = [
    // Insert text data here
    {
      student_id: 2,
      date: '2024-02-23',
      message: 'Hello',
    },
  ];

  try {
    for (const text of textsData) {
      await promisePool.execute('INSERT IGNORE INTO texts (student_id, date, message) VALUES (?, ?, ?)', [text.student_id, text.date, text.message]);
    }
  } catch (err) {
    console.error('Error inserting text:', err);
  }
}
