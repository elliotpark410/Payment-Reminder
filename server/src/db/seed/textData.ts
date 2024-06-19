import connection from "../connection";

export function seedTexts() {
  const textsData = [
    // Insert text data here
    {
      student_id: 2,
      date: '2024-02-23',
      message: 'Hello',
    },
  ];

  for (const text of textsData) {
    connection.query('INSERT IGNORE INTO texts SET ?', text, (err) => {
      if (err) {
        console.error('Error inserting text:', err);
      }
    });
  }
}
