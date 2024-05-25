import React from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { host } from '../../lib/constants';
import '../../App.css';

const EditReset = ({ show, onHide, lesson, resetDate, setResetDate, setEditLesson, studentId, fetchStudentLessons, fetchStudentResetLessons, fetchStudentTexts, setLessons, setResetLessons, setTexts }) => {
  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`${host}/lesson/${lesson.id}`, { reset_lesson_date: resetDate });
      console.log('Reset updated successfully:', response.data);
      onHide();
      setEditLesson(null);
      setResetDate('');
      fetchStudentLessons(studentId, setLessons);
      fetchStudentResetLessons(studentId, setResetLessons);
      fetchStudentTexts(studentId, setTexts);
    } catch (error) {
      console.error('Error updating lesson:', error);
      throw error;
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Reset</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="resetDate">
          <Form.Label>Reset Date</Form.Label>
          <Form.Control
            type="date"
            value={resetDate}
            onChange={(e) => setResetDate(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="smallButton"
          variant="primary"
          onClick={handleSaveEdit}
        >
          Save
        </Button>
        <Button
          className="smallButton"
          variant="secondary"
          onClick={onHide}
          >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditReset;
