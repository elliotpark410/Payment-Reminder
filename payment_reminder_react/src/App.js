// App.js
import React from 'react';
import Header from './Header';
import StudentInfo from './StudentInfo';
import LessonNumber from './LessonNumber';
import LessonHistory from './LessonHistory';
import Reminder from './Reminder';
import './App.css'; // Import the CSS file

function App() {
  return (
    <div className="app">
      <Header />
      <div className="content">
        <table className="table">
          <thead>
            <tr className="table-row">
              <th className="table-header">Student Info</th>
              <th className="table-header">Lesson Number</th>
              <th className="table-header">Lesson History</th>
              <th className="table-header">Reminder</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-row">
              <td className="table-cell">
                <div className="grid-item">
                  <StudentInfo />
                </div>
              </td>
              <td className="table-cell">
                <div className="grid-item">
                  <LessonNumber />
                </div>
              </td>
              <td className="table-cell">
                <div className="grid-item">
                  <LessonHistory />
                </div>
              </td>
              <td className="table-cell">
                <div className="grid-item">
                  <Reminder />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default App;
