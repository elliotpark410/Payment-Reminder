// GetStudentLessons.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { host } from './lib/constants';
import { Modal, Button } from 'react-bootstrap';

function GetStudentLessons({ studentId, onClose }) {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(`${host}/lesson/student/${studentId}`);
        const sortedLessons = response.data.sort((a, b) => new Date(b.lesson_date) - new Date(a.lesson_date));
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
          Lessons
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table">
          <thead>
            <tr>
              <th>Number</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson.id}>
                <td>{lesson.lessonNumber}</td>
                <td>{lesson.formattedDate}</td>
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
