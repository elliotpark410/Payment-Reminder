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
        <div className="grid-container">
          <div className="grid-item">
            <StudentInfo />
          </div>
          <div className="grid-item">
            <LessonNumber />
          </div>
          <div className="grid-item">
            <LessonHistory />
          </div>
          <div className="grid-item">
            <Reminder />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
