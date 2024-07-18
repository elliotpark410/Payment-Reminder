// AddLesson.js
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button } from 'react-bootstrap';
import LessonCalendar from './Calendar/Calendar';
import { api } from '../../lib/constants';
import { formatDate } from '../../lib/util';
import AddPayment from '../Payment/AddPayment';
import AddReset from '../Reset/AddReset';
import GetStudentHistory from './GetStudentHistory';
import {
  fetchStudentLessons,
  fetchStudentResets,
  fetchStudentPayments,
  fetchStudentTexts
} from './GetStudentHistory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCreditCard, faList } from '@fortawesome/free-solid-svg-icons';
import '../../App.css';
import './Calendar/calendarStyles.css';

function AddLesson({ onClose, studentId, students, onUpdate }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [resets, setResets] = useState([]);
  const [payments, setPayments] = useState([]);
  const [texts, setTexts] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const fetchStudentData = useCallback(async () => {
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
    fetchStudentData();
  }, [fetchStudentData, studentId]);

  const fetchStudentLessonData = async () => {
    const fetchedLessons = await fetchStudentLessons(studentId);
    setLessons(fetchedLessons);
  };

  const fetchStudentResetData = async () => {
    const fetchedResets = await fetchStudentResets(studentId);
    setResets(fetchedResets);
  };

  const fetchStudentPaymentData = async () => {
    const fetchedPayments = await fetchStudentPayments(studentId);
    setPayments(fetchedPayments);
  };

  // Function to handle add lesson on the selected date
  const handleAddLesson = async () => {
    try {
      if (!selectedDate) {
        toast.error('Please select a date before adding lesson.');
        return;
      };

      const formattedDate = selectedDate.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });

      // Make API call to add lesson using Axios
      const response = await api.post(`/lesson/add`, {
        student_id: studentId,
        date: formattedDate
      });

      // console.log('Added lesson:', response.data);

      const notificationDate = formatDate(selectedDate);

      if (response.status === 200 || response.status === 201) {
        // Show notifcation
        toast.success(`Added lesson ${notificationDate}`, {
          position: 'top-left',
          autoClose: 3000 // Close after 3 seconds
        });
        fetchStudentLessonData();
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
    fetchStudentData();
  };

  // Function to open GetStudentHistory modal
  const handleViewHistory = () => {
    setShowHistoryModal(true);
  };

  // Function to close GetStudentHistory modal
  const handleCloseHistoryModal = () => {
    setShowHistoryModal(false);
    fetchStudentData();
  };

  const student = students.find((s) => s.id === studentId);
  const studentName = student ? student.student_name : '';

  return (
    <>
      <Modal
        show
        onHide={onClose}
        size="lg"
        className={showPaymentModal || showHistoryModal ? 'calendar-disabled' : ''}
      >
        <Modal.Header
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
          closeButton
        >
          <Modal.Title>{studentName}</Modal.Title>
          <div style={{ flex: 1 }}></div>
          <div style={{ flex: 0, display: 'flex', justifyContent: 'center' }}>
            <Button className="button" variant="dark" onClick={handleViewHistory}>
              <FontAwesomeIcon icon={faList} style={{ marginRight: '0.5em' }} />
              View
            </Button>
          </div>
          <div style={{ flex: 1.4 }}></div>
        </Modal.Header>
        <Modal.Body style={{ padding: 0, height: '100%' }}>
          <LessonCalendar
            onSelectDate={(date) => setSelectedDate(date)}
            lessons={lessons}
            resets={resets}
            payments={payments}
            texts={texts}
            fetchStudentLessonData={fetchStudentLessonData}
            fetchStudentResetData={fetchStudentResetData}
            fetchStudentPaymentData={fetchStudentPaymentData}
            onUpdate={onUpdate}
          />
        </Modal.Body>
        <Modal.Footer>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ display: 'flex', textAlign: 'left' }}>
              <div style={{ marginRight: '1em' }}>
                <Button className="button" variant="success" onClick={handleAddPayment}>
                  <FontAwesomeIcon icon={faCreditCard} style={{ marginRight: '0.5em' }} />
                  Payment
                </Button>
              </div>
              <div style={{ marginRight: '1em' }}>
                <AddReset
                  studentId={studentId}
                  selectedDate={selectedDate}
                  fetchStudentResetData={fetchStudentResetData}
                  onUpdate={onUpdate}
                />
              </div>
              <div>
                <Button className="button" variant="primary" onClick={handleAddLesson}>
                  <FontAwesomeIcon icon={faBook} style={{ marginRight: '0.5em' }} />
                  Lesson
                </Button>
              </div>
            </div>
            <div>
              <Button className="button" variant="secondary" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>

      {showPaymentModal && (
        <AddPayment
          show={showPaymentModal}
          onClose={handleClosePaymentModal}
          studentId={studentId}
          selectedDate={selectedDate}
          fetchStudentPaymentData={fetchStudentPaymentData}
        />
      )}

      {showHistoryModal && (
        <GetStudentHistory
          studentId={studentId}
          studentName={studentName}
          onClose={handleCloseHistoryModal}
          onUpdate={() => {
            fetchStudentData();
            onUpdate();
          }}
        />
      )}
    </>
  );
}

export default AddLesson;
