interface User {
  id: number; // Assuming id is a serial primary key in your PostgreSQL table
  studentName: string;
  parentName: string;
  phoneNumber: string;
}

export default User;