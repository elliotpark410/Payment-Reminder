interface IText {
  id: number;
  userId: number; // Foreign key referencing the id column in the User table
  studentName: string;
  date: Date;
  recentMessage: string;
}

export default IText;