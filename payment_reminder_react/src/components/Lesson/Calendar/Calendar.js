import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendarStyles.css';
import EditLesson from '../EditLesson';
import EditReset from '../../Reset/EditReset';
import EditPayment from '../../Payment/EditPayment';
import SentText from '../../Text/SentText';

function LessonCalendar({ onSelectDate, lessons, resets, payments, texts, fetchData }) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editType, setEditType] = useState('');

  const [editLesson, setEditLesson] = useState(null);
  const [lessonDate, setLessonDate] = useState('');

  const [editReset, setEditReset] = useState(null);
  const [resetDate, setResetDate] = useState('');

  const [editPayment, setEditPayment] = useState(null);
  const [paymentDate, setPaymentDate] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(null);

  const [editText, setEditText] = useState(null);



  const handleEditClick = (date) => {
    const lesson = lessons.find((lesson) => new Date(lesson.date).toDateString() === date.toDateString());
    const reset = resets.find((reset) => new Date(reset.date).toDateString() === date.toDateString());
    const payment = payments.find((payment) => new Date(payment.date).toDateString() === date.toDateString());
    const text = texts.find((text) => new Date(text.date).toDateString() === date.toDateString());

    if (lesson) {
      setEditModalOpen(true);
      setEditType("lesson");
      setEditLesson(lesson);
      setLessonDate(new Date(lesson.date).toISOString().slice(0, 10));
    }

    if (reset) {
      setEditModalOpen(true);
      setEditType("reset");
      setEditReset(reset);
      setResetDate(new Date(reset.date).toISOString().slice(0, 10));
    }

    if (payment) {
      setEditModalOpen(true);
      setEditType("payment");
      setEditPayment(payment);
      setPaymentDate(new Date(payment.date).toISOString().slice(0, 10));
      setPaymentAmount(payment.amount);
    }

    if (text) {
      setEditModalOpen(true);
      setEditType("text");
      setEditText(text);
    }
  };

  const closeModal = () => {
    setEditModalOpen(false);
    setEditText(null);
    setEditPayment(null);
    setEditReset(null);
    setEditLesson(null);
    setEditType('');
  };


  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const lessonDates = lessons.map((lesson) => new Date(lesson.date).toDateString());
      const textDates = texts.map((text) => new Date(text.date).toDateString());
      const resetDates = resets.map((reset) => new Date(reset.date).toDateString());
      const paymentDates = payments.map((payment) => new Date(payment.date).toDateString());

      const hasLesson = lessonDates.includes(date.toDateString());
      const hasText = textDates.includes(date.toDateString());
      const hasReset = resetDates.includes(date.toDateString());
      const hasPayment = paymentDates.includes(date.toDateString());

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '5px'
          }}
        >
          {hasLesson && (
            <div
              className="lessonRecord"
              style={{
                width: '30px',
                height: '10px',
                backgroundColor: 'navy',
                borderRadius: '5px',
                margin: '2px'
              }}
              onClick={() => handleEditClick(date)}
            />
          )}
          {hasText && (
            <div
              className="textRecord"
              style={{
                width: '30px',
                height: '10px',
                backgroundColor: '#00bbf0',
                borderRadius: '5px',
                margin: '2px'
              }}
              onClick={() => handleEditClick(date)}
            />
          )}
          {hasReset && (
            <div
            className="resetRecord"
              style={{
                width: '30px',
                height: '10px',
                backgroundColor: '#ffc107',
                borderRadius: '5px',
                margin: '2px'
              }}
              onClick={() => handleEditClick(date)}
            />
          )}
          {hasPayment && (
            <div
              className="paymentRecord"
              style={{
                width: '30px',
                height: '10px',
                backgroundColor: 'green',
                borderRadius: '5px',
                margin: '2px'
              }}
              onClick={() => handleEditClick(date)}
            />
          )}
        </div>
      );
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

      {editType === 'lesson' && (
        <EditLesson
          show={editModalOpen}
          onHide={closeModal}
          lesson={editLesson}
          lessonDate={lessonDate}
          setLessonDate={setLessonDate}
          setEditLesson={setEditLesson}
          fetchData={fetchData}
        />
      )}
      {editType === 'reset' && (
        <EditReset
          show={editModalOpen}
          onHide={closeModal}
          reset={editReset}
          resetDate={resetDate}
          setResetDate={setResetDate}
          setEditReset={setEditReset}
          fetchData={fetchData}
        />
      )}
      {editType === 'payment' && (
        <EditPayment
          show={editModalOpen}
          onHide={closeModal}
          payment={editPayment}
          paymentDate={paymentDate}
          paymentAmount={paymentAmount}
          setPaymentDate={setPaymentDate}
          setPaymentAmount={setPaymentAmount}
          setEditPayment={setEditPayment}
          fetchData={fetchData}
          />
      )}
      {editType === 'text' && (
        <SentText
          show={editModalOpen}
          textMessage={editText.message}
          onHide={closeModal}
        />
      )}
    </div>
  );
}

export default LessonCalendar;
