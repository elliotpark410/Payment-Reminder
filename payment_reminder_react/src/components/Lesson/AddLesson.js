// AddLesson.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button } from 'react-bootstrap';
import LessonCalendar from './Calendar/Calendar'; // Import your calendar component
import axios from 'axios'; // Import Axios
import { host } from '../../lib/constants';
import AddPayment from '../Payment/AddPayment';
import '../../App.css';

function AddLesson({ onClose, studentId, onAdd, subscriptionAmount }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

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
        toast.success(`Sucessfully added lesson`, {
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

  // Function to open AddPayment modal
  const handleAddPayment = () => {
    setShowPaymentModal(true);
  };

  // Function to close AddPayment modal
  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
  };

  return (
    <>
      <Modal show onHide={onClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Select Date</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: 0, height: '100%' }}>
          <LessonCalendar onSelectDate={(date) => setSelectedDate(date)} />
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
          subscriptionAmount={subscriptionAmount}
        />
      )}
    </>
  );
}

export default AddLesson;
