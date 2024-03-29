// GetStudentLessons.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { host } from './lib/constants';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function GetStudentLessons({ studentId, studentName, onClose }) {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
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

    fetchLessons();
  }, [studentId, onClose]);

  const handleDeleteLesson = async (lessonId) => {
    try {
      await axios.delete(`${host}/lesson/${lessonId}`);
      console.log(`Lesson with ID ${lessonId} deleted successfully`);
      setLessons(lessons.filter(lesson => lesson.id !== lessonId)); // Remove the deleted lesson from the state
    } catch (error) {
      console.error('Error deleting lesson:', error);
      // Handle error here, if necessary
    }
  };

  return (
    <Modal
      size="lg"
      show
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
                <td>{lesson.formattedDate}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDeleteLesson(lesson.id)} // Pass the lesson ID to delete directly
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
    </Modal>
  );
}

export default GetStudentLessons;
