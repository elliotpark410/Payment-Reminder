// AddLesson.js
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button } from 'react-bootstrap';
import LessonCalendar from './Calendar/Calendar'; // Import your calendar component
import axios from 'axios'; // Import Axios
import { host } from '../../lib/constants';
import AddPayment from '../Payment/AddPayment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faList } from '@fortawesome/free-solid-svg-icons';
import '../../App.css';

function AddLesson({
  onClose,
  studentId,
  onAdd,
  students,
  onUpdate,
  onViewLessons
 }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  // Function to handle add lesson on the selected date
  const handleAddLesson = async () => {
    try {
      const formattedDate = selectedDate.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });

      // Make API call to add lesson using Axios
      const response = await axios.post(`${host}/lesson/add`, {
        student_id: studentId,
        lesson_date: formattedDate
      });

      console.log('Added lesson:', response.data);
      onAdd();

      if (response.status === 200 || 201) {
        // Show notifcation
        toast.success(`Added lesson`, {
          autoClose: 3000, // Close after 3 seconds
        });
      } else {
        console.error('Error adding lesson. Unexpected response:', response);
      };

      onClose();
    } catch (error) {
      console.error('Error adding lesson:', error);
      throw error
    }
  };

  // Function to reset lesson count
  const resetLessonCount = async () => {
    try {
      const formattedDate = selectedDate.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });

      const notificationDate = selectedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).replace(/\//g, ' / ');

      const response = await axios.post(`${host}/lesson/reset`, {
        student_id: studentId,
        reset_lesson_date: formattedDate
      });

      if (response.status === 200 || 201) {
        // Show notifcation
        toast.warning(`Lesson reset on ${notificationDate}`, {
          autoClose: 4000, // Close after 3 seconds
        });
        onUpdate();
      } else {
        console.error('Error resetting lesson count. Unexpected response:', response);
      };
    } catch (error) {
      console.error('Error resetting lesson count:', error);
      throw error
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
      <Modal show onHide={onClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{studentName}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: 0, height: '100%' }}>
          <div style={{ flex: 1, textAlign: 'right', paddingRight: '100px' }}>
            <Button
              className="button"
              variant="outline-success"
              title="View lessons"
              onClick={() => onViewLessons(student)}
            >
                <FontAwesomeIcon icon={faList} style={{ marginRight: '0.5em' }} />
                History
              </Button>
          </div>
          <LessonCalendar onSelectDate={(date) => setSelectedDate(date)} selectedDate={selectedDate}/>
        </Modal.Body>
        <Modal.Footer>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <Button
              className="button"
              variant="success"
              onClick={handleAddPayment}
            >
              Add Payment
            </Button>
          </div>
          <Button
            className="button"
            variant="outline-warning"
            title="Reset lesson count"
            onClick={resetLessonCount}
          >
            <FontAwesomeIcon icon={faSyncAlt} />
          </Button>
          <Button
            className="button"
            variant="primary"
            onClick={handleAddLesson}
          >
            Add Lesson
          </Button>
          <Button
            className="button"
            variant="secondary"
            onClick={onClose}
          >
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
          onAdd={onAdd}
        />
      )}
    </>
  );
}

export default AddLesson;
