import User from "./User"

// Define the structure of a Lesson entity
interface Lesson {
  id: number; // Assuming id is a serial primary key in your PostgreSQL table
  totalNumberOfLessons: number;
  studentName: string;
  lessonDate: Date;
  reminderSentDate: Date;
  numberOfLessonsInSubscription: number;
  subscriptionPrice: number;
  user: User;
}

export default Lesson;