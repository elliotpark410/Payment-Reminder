// AddLesson.js
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button } from 'react-bootstrap';
import LessonCalendar from './Calendar/Calendar';
import axios from 'axios';
import { host } from '../../lib/constants';
import { formatDate } from '../../lib/util';
import AddPayment from '../Payment/AddPayment';
import AddReset from '../Reset/AddReset';
import {
  fetchStudentLessons,
  fetchStudentResets,
  fetchStudentPayments,
  fetchStudentTexts
} from './GetStudentHistory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import '../../App.css';
import './Calendar/calendarStyles.css';

function AddLesson({ onClose, studentId, students, onUpdate }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [resets, setResets] = useState([]);
  const [payments, setPayments] = useState([]);
  const [texts, setTexts] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const fetchData = useCallback(async () => {
    const fetchedLessons = await fetchStudentLessons(studentId);
    const fetchedResets = await fetchStudentResets(studentId);
    const fetchedPayments = await fetchStudentPayments(studentId);
    const fetchedTexts = await fetchStudentTexts(studentId);

    setLessons(fetchedLessons);
    setResets(fetchedResets);
    setPayments(fetchedPayments);
    setTexts(fetchedTexts);
  }, [studentId]);

  useEffect(() => {
    setSelectedDate(new Date());
    fetchData();
  }, [fetchData, studentId]);

  // Function to handle add lesson on the selected date
  const handleAddLesson = async () => {
    try {
      const formattedDate = selectedDate.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });

      // Make API call to add lesson using Axios
      const response = await axios.post(`${host}/lesson/add`, {
        student_id: studentId,
        date: formattedDate
      });

      // console.log('Added lesson:', response.data);

      const notificationDate = formatDate(selectedDate);

      if (response.status === 200 || 201) {
        // Show notifcation
        toast.success(`Added lesson ${notificationDate}`, {
          position: 'top-left',
          autoClose: 3000 // Close after 3 seconds
        });
        fetchData();
        onUpdate();
      } else {
        console.error('Error adding lesson. Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error adding lesson:', error);
      throw error;
    }
  };

  // Function to open AddPayment modal
  const handleAddPayment = () => {
    setShowPaymentModal(true);
  };

  // Function to close AddPayment modal
  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
  };

  const student = students.find((s) => s.id === studentId);
  const studentName = student ? student.student_name : '';

  return (
    <>
      <Modal
        show
        onHide={onClose}
        size="lg"
        className={showPaymentModal ? 'calendar-disabled' : ''}
      >
        <Modal.Header closeButton>
          <Modal.Title>{studentName}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: 0, height: '100%' }}>
          <LessonCalendar
            onSelectDate={(date) => setSelectedDate(date)}
            lessons={lessons}
            resets={resets}
            payments={payments}
            texts={texts}
            fetchData={fetchData}
          />
        </Modal.Body>
        <Modal.Footer>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <Button className="button" variant="success" onClick={handleAddPayment}>
              <FontAwesomeIcon icon={faCreditCard} style={{ marginRight: '0.5em' }} />
              Payment
            </Button>
          </div>
          <AddReset
            studentId={studentId}
            selectedDate={selectedDate}
            fetchData={fetchData}
            onUpdate={onUpdate}
          />
          <Button className="button" variant="primary" onClick={handleAddLesson}>
            <FontAwesomeIcon icon={faBook} style={{ marginRight: '0.5em' }} />
            Lesson
          </Button>
          <Button className="button" variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {showPaymentModal && (
        <AddPayment
          show={showPaymentModal}
          onClose={handleClosePaymentModal}
          studentId={studentId}
          selectedDate={selectedDate}
          fetchData={fetchData}
        />
      )}
    </>
  );
}

export default AddLesson;
