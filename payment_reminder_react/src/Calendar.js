import React from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default calendar styles
import './calendarStyles.css';

function MyCalendar({ onSelectDate }) {
  return (
    <div className="d-flex justify-content-center">
      <Calendar
        onClickDay={(date) => onSelectDate(date)} // Use onClickDay instead of onSelectSlot
        className="shadow-none border-0" // Remove default calendar shadow and border
      />
    </div>
  );
}

export default MyCalendar;
