import React from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { host } from '../../lib/constants';
import '../../App.css';

const EditLesson = ({ show, onHide, lesson, lessonDate, setLessonDate, setEditLesson, studentId, fetchStudentLessons, fetchStudentTexts, setLessons, setTexts, fetchData }) => {
  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`${host}/lesson/${lesson.id}`, { lesson_date: lessonDate });
      console.log('Lesson updated successfully:', response.data);
      onHide();
      setEditLesson(null);
      setLessonDate('');
      fetchData();
      fetchStudentLessons(studentId, setLessons);
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

export default EditLesson;
