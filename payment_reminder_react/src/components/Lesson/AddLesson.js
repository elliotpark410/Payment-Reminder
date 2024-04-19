// AddLesson.js
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import LessonCalendar from './Calendar/Calendar'; // Import your calendar component
import axios from 'axios'; // Import Axios
import { host } from '../../lib/constants';

function AddLesson({ onClose, studentId, onAdd }) { // Pass onAdd as a prop
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false); // State to manage loading state

  // Function to handle saving the selected date
  const handleSave = async () => {
    try {
      setLoading(true); // Set loading state to true

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
      onClose();
    } catch (error) {
      console.error('Error adding lesson:', error);
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  return (
    <Modal show onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add Lesson</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: 0, height: '100%' }}>
        <LessonCalendar onSelectDate={(date) => setSelectedDate(date)} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={loading}>
          {loading ? 'Adding Lesson...' : 'Save'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddLesson;
