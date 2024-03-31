import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { host } from '../../lib/constants';

function GetStudentLesson({ studentId, studentName, onClose }) {
  const [lessons, setLessons] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editLesson, setEditLesson] = useState(null);
  const [lessonDate, setLessonDate] = useState('');

  useEffect(() => {
    fetchLessons(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId]); // Include studentId in the dependency array

  const fetchLessons = async () => {
    try {
      const response = await axios.get(`${host}/lesson/student/${studentId}`);
      const sortedLessons = response.data.sort((a, b) => new Date(a.lesson_date) - new Date(b.lesson_date));
      const formattedLessons = sortedLessons.map((lesson, index) => ({
        ...lesson,
        lessonNumber: index + 1,
        formattedDate: new Date(lesson.lesson_date).toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric'
        })
      }));
      setLessons(formattedLessons);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    try {
      await axios.delete(`${host}/lesson/${lessonId}`);
      console.log(`Lesson with ID ${lessonId} deleted successfully`);
      fetchLessons(); // Fetch lessons after deleting
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };

  const handleEditLesson = (lesson) => {
    setEditLesson(lesson);
    setLessonDate(new Date(lesson.lesson_date).toISOString().slice(0, 10));
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`${host}/lesson/${editLesson.id}`, { lesson_date: lessonDate });
      console.log('Lesson updated successfully:', response.data);
      setShowEditModal(false);
      setEditLesson(null);
      setLessonDate('');
      fetchLessons(); // Fetch lessons after saving edit
    } catch (error) {
      console.error('Error updating lesson:', error);
    }
  };

  return (
    <Modal
      size="lg"
      show={true}
      onHide={onClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {studentName}'s Lessons
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table">
          <thead>
            <tr>
              <th>Number</th>
              <th>Date</th>
              <th>{/* Delete */}</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson.id}>
                <td>{lesson.lessonNumber}</td>
                <td onClick={() => handleEditLesson(lesson)}>
                  {lesson.formattedDate}
                </td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDeleteLesson(lesson.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>

      {/* Edit Lesson Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
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
          <Button variant="primary" onClick={handleSaveEdit}>
            Save
          </Button>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Modal>
  );
}

export default GetStudentLesson;
