// AddLesson.js
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button } from 'react-bootstrap';
import LessonCalendar from './Calendar/Calendar';
import axios from 'axios';
import { host } from '../../lib/constants';
import AddPayment from '../Payment/AddPayment';
import { formatDate } from '../../lib/util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faBook, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import '../../App.css';

function AddLesson({
  onClose,
  studentId,
  students,
  onUpdate
 }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    setSelectedDate(new Date());
    fetchStudentLessons(studentId);
  }, [studentId]);

  const fetchStudentLessons = async (studentId) => {
    try {
      const response = await axios.get(`${host}/lesson/student/${studentId}`);

      // Filter out records with null or invalid lesson_date
      const validLessons = response.data.filter((lesson) => {
        return lesson.lesson_date !== null && lesson.lesson_date !== undefined && lesson.deleted_at === null;
      });

      // Sort the valid records by lesson_date
      const sortedLessons = validLessons.sort(
        (a, b) => new Date(a.lesson_date) - new Date(b.lesson_date)
      );

      // Format the sorted lessons
      const formattedLessons = sortedLessons.map((lesson, index) => ({
        ...lesson,
        lesson: true,
        lessonNumber: index + 1,
        formattedDate: formatDate(lesson.lesson_date)
      }));

      setLessons(formattedLessons);
    } catch (error) {
      console.error('Error fetching lessons:', error);
      throw error;
    }
  };

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

      if (response.status === 200 || 201) {
        // Show notifcation
        toast.success(`Added lesson`, {
          autoClose: 3000, // Close after 3 seconds
        });
        fetchStudentLessons(studentId);
        onUpdate();
      } else {
        console.error('Error adding lesson. Unexpected response:', response);
      };
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
          autoClose: 3000, // Close after 3 seconds
        });
        fetchStudentLessons(studentId);
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
          <LessonCalendar
          onSelectDate={(date) => setSelectedDate(date)} selectedDate={selectedDate}
          lessons={lessons}
          />
        </Modal.Body>
        <Modal.Footer>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <Button
              className="button"
              variant="success"
              onClick={handleAddPayment}
            >
              <FontAwesomeIcon icon={faCreditCard} style={{ marginRight: '0.5em' }} />
              Payment
            </Button>
          </div>
          <Button
            className="button"
            variant="warning"
            title="Reset lesson count"
            onClick={resetLessonCount}
          >
            <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '0.5em' }} />
            Reset
          </Button>
          <Button
            className="button"
            variant="primary"
            onClick={handleAddLesson}
          >
            <FontAwesomeIcon icon={faBook} style={{ marginRight: '0.5em' }} />
            Lesson
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
          onUpdate={onUpdate}
        />
      )}
    </>
  );
}

export default AddLesson;
