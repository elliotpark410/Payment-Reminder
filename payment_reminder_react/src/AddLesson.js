import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import MyCalendar from './Calendar'; // Import your calendar component

function AddLesson({ onClose }) {
  const [selectedDate, setSelectedDate] = useState(null);

  // Function to handle saving the selected date
  const handleSave = () => {
    // Add your logic to save the selected date
    console.log('Selected date:', selectedDate);
    onClose(); // Close the modal after saving
  };

  return (
    <Modal show onHide={onClose} size="lg"> {/* Set size to large */}
      <Modal.Header closeButton>
        <Modal.Title>Add Lesson</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: 0, height: '100%' }}> {/* Remove default padding and set height to 100% */}
        <MyCalendar onSelectDate={(date) => setSelectedDate(date)} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddLesson;
