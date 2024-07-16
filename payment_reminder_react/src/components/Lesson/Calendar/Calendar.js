import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendarStyles.css';
import EditLesson from '../EditLesson';
import EditReset from '../../Reset/EditReset';
import EditPayment from '../../Payment/EditPayment';
import SentText from '../../Text/SentText';

function LessonCalendar({
  onSelectDate,
  lessons,
  resets,
  payments,
  texts,
  fetchStudentLessonData,
  fetchStudentResetData,
  fetchStudentPaymentData,
  onUpdate
}) {
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

  const handleEditClick = (type, id) => {
    switch (type) {
      case 'lesson':
        const lesson = lessons.find((lesson) => lesson.id === id);
        if (lesson) {
          setEditModalOpen(true);
          setEditType('lesson');
          setEditLesson(lesson);
          setLessonDate(new Date(lesson.date).toISOString().slice(0, 10));
        }
        break;
      case 'reset':
        const reset = resets.find((reset) => reset.id === id);
        if (reset) {
          setEditModalOpen(true);
          setEditType('reset');
          setEditReset(reset);
          setResetDate(new Date(reset.date).toISOString().slice(0, 10));
        }
        break;
      case 'payment':
        const payment = payments.find((payment) => payment.id === id);
        if (payment) {
          setEditModalOpen(true);
          setEditType('payment');
          setEditPayment(payment);
          setPaymentDate(new Date(payment.date).toISOString().slice(0, 10));
          setPaymentAmount(payment.amount);
        }
        break;
      case 'text':
        const text = texts.find((text) => text.id === id);
        if (text) {
          setEditModalOpen(true);
          setEditType('text');
          setEditText(text);
        }
        break;
      default:
        break;
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
      const toDateString = (date) => new Date(date).toISOString().slice(0, 10);

      const utcDateString = toDateString(
        new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
      );

      const filterByDate = (records, dateString) =>
        records.filter((record) => toDateString(record.date) === dateString);

      const lessonRecords = filterByDate(lessons, utcDateString);
      const textRecords = filterByDate(texts, utcDateString);
      const resetRecords = filterByDate(resets, utcDateString);
      const paymentRecords = filterByDate(payments, utcDateString);

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '5px'
          }}
        >
          {lessonRecords.map((lesson) => (
            <div
              key={lesson.id}
              className="lessonRecord"
              style={{
                width: '30px',
                height: '10px',
                backgroundColor: 'navy',
                borderRadius: '5px',
                margin: '2px'
              }}
              onClick={() => handleEditClick('lesson', lesson.id)}
            />
          ))}
          {textRecords.map((text) => (
            <div
              key={text.id}
              className="textRecord"
              style={{
                width: '30px',
                height: '10px',
                backgroundColor: '#00bbf0',
                borderRadius: '5px',
                margin: '2px'
              }}
              onClick={() => handleEditClick('text', text.id)}
            />
          ))}
          {resetRecords.map((reset) => (
            <div
              key={reset.id}
              className="resetRecord"
              style={{
                width: '30px',
                height: '10px',
                backgroundColor: '#ffc107',
                borderRadius: '5px',
                margin: '2px'
              }}
              onClick={() => handleEditClick('reset', reset.id)}
            />
          ))}
          {paymentRecords.map((payment) => (
            <div
              key={payment.id}
              className="paymentRecord"
              style={{
                width: '30px',
                height: '10px',
                backgroundColor: 'green',
                borderRadius: '5px',
                margin: '2px'
              }}
              onClick={() => handleEditClick('payment', payment.id)}
            />
          ))}
        </div>
      );
    }
    return null;
  };

  const calendarStyling = `shadow-none border-0 ${editModalOpen ? 'calendar-disabled' : ''}`;

  return (
    <div className="d-flex justify-content-center">
      <Calendar
        onClickDay={(date) => onSelectDate(date)} // Use onClickDay instead of onSelectSlot
        className={calendarStyling}
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
          fetchStudentLessonData={fetchStudentLessonData}
          onUpdate={onUpdate}
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
          fetchStudentResetData={fetchStudentResetData}
          onUpdate={onUpdate}
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
          fetchStudentPaymentData={fetchStudentPaymentData}
          onUpdate={onUpdate}
        />
      )}
      {editType === 'text' && (
        <SentText show={editModalOpen} textMessage={editText.message} onHide={closeModal} />
      )}
    </div>
  );
}

export default LessonCalendar;
