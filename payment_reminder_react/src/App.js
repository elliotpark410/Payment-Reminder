import React from 'react';
import Header from './Header';
import StudentInfo from './StudentInfo';
import LessonNumber from './LessonNumber';
import LessonHistory from './LessonHistory';
import Reminder from './Reminder';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="content">
        <StudentInfo />
        <LessonNumber />
        <LessonHistory />
        <Reminder />
      </div>
    </div>
  );
}

export default App;
