interface ILesson {
  id: number;
  totalNumberOfLessons: number;
  userId: number; // Foreign key referencing the id column in the User table
  studentName: string;
  lessonDate: Date;
  reminderSentDate: Date;
}

export default ILesson;
