import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { host } from '../../lib/constants';

function EditLesson({ lesson, onClose, onUpdate }) {
  const [lessonDate, setLessonDate] = useState(new Date(lesson.lesson_date).toISOString().slice(0, 10));

  const handleSave = async () => {
    try {
      await axios.put(`${host}/lesson/${lesson.id}`, { lesson_date: lessonDate });
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating lesson:', error);
    }
  };

  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Lesson</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="lessonDate">
          <Form.Label>Lesson Date</Form.Label>
          <Form.Control
            type="date"
            value={lessonDate}
            onChange={(e) => setLessonDate(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditLesson;
