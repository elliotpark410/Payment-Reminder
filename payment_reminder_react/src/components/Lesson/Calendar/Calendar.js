import React from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendarStyles.css';

function LessonCalendar({ onSelectDate, lessons }) {

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const lessonDates = lessons.map(lesson => new Date(lesson.lesson_date).toDateString());
      if (lessonDates.includes(date.toDateString())) {
        return <div
          style={{
            height: '10px',
            backgroundColor: 'blue',
            borderRadius: '5px',
            marginTop: '10px'
          }}
        />;
      }
    }
    return null;
  };

  return (
    <div className="d-flex justify-content-center">
      <Calendar
        onClickDay={(date) => onSelectDate(date)} // Use onClickDay instead of onSelectSlot
        className="shadow-none border-0" // Remove default calendar shadow and border
        tileContent={tileContent}
      />
    </div>
  );
}

export default LessonCalendar;
