import connection from '../connection';

export async function seedUsers() {
  const usersData = [
    {
      student_name: 'Soo Borson',
      phone_number: '206-406-7645',
    },
    {
      student_name: 'Nick Korneff',
      phone_number: '909-631-3843',
    },
    {
      student_name: 'Isaiah Lopez',
      phone_number: '951-454-6564',
    },
    {
      student_name: 'Maks Miner',
      phone_number: '949-298-0088',
    },
    {
      student_name: 'Richard Wong',
      phone_number: '510-813-9989',
    },
    {
      student_name: 'Jake Tran',
      phone_number: '480-280-8580',
    },
    {
      student_name: 'Alexis Mabugat',
      phone_number: '818-416-0848',
    },
    {
      student_name: 'Mina Deng',
      phone_number: '626-566-0052',
    },
    {
      student_name: 'Juliette Bordier-Johnson',
      phone_number: '949-610-5259',
    },
    {
      student_name: 'Lawrebce Abbott',
      phone_number: '760-536-2605',
    },
    {
      student_name: 'Stella Sandeina Achda',
      phone_number: '925-391-4684',
    },
    {
      student_name: 'Kalaya Cadle',
      phone_number: '818-579-1810',
    },
    {
      student_name: 'Nili Wesolowski',
      phone_number: '310-993-9549',
    },
    {
      student_name: 'Chris Sanchee',
      phone_number: '714-718-8378',
    },
    {
      student_name: 'Tao Keny',
      phone_number: '714-924-2816',
    },
    {
      student_name: 'Valentino Cavarica',
      phone_number: '949-395-2556',
    },
    {
      student_name: 'Aiden Kim',
      phone_number: '949-527-2568',
    },
    {
      student_name: 'Leah Feigenbaum',
      phone_number: '213-255-9578',
    },
    {
      student_name: 'Edbert Feng',
      phone_number: '213-700-8938',
    },
  ];

  for (const user of usersData) {
   connection.query('INSERT IGNORE INTO users SET ?', user);
  }
}
