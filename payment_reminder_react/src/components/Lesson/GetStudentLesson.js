import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { host } from '../../lib/constants';
import DeleteLesson from './DeleteLesson';
import EditLesson from './EditLesson';

const fetchStudentLessons = async (studentId, setLessons) => {
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
    throw error;
  }
};

const fetchStudentTexts = async (studentId, setTexts) => {
  try {
    const response = await axios.get(`${host}/text/${studentId}`);
    const unsortedTexts = response.data;
    const sortedTexts = unsortedTexts.map((text) => ({
      ...text,
      formattedDate: new Date(text.date).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '-')
    }));
    setTexts(sortedTexts);
  } catch (error) {
    console.error('Error fetching texts:', error);
    throw error;
  }
};

function GetStudentLesson({ studentId, studentName, onClose }) {
  const [lessons, setLessons] = useState([]);
  const [texts, setTexts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editLesson, setEditLesson] = useState(null);
  const [lessonDate, setLessonDate] = useState('');

  useEffect(() => {
    fetchStudentLessons(studentId, setLessons);
    fetchStudentTexts(studentId, setTexts);
  }, [studentId]);

  const handleEditLesson = (lesson) => {
    setEditLesson(lesson);
    setLessonDate(new Date(lesson.lesson_date).toISOString().slice(0, 10));
    setShowEditModal(true);
  };

  const mergedRecords = [...lessons, ...texts].sort((a, b) => new Date(a.formattedDate) - new Date(b.formattedDate));

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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mergedRecords.map((record) => (
              <tr key={record.id}>
                {record.hasOwnProperty('lessonNumber') ? (
                  <>
                    <td>{record.lessonNumber}</td>
                    <td onClick={() => handleEditLesson(record)}>
                      {record.formattedDate}
                    </td>
                    <td>
                      <DeleteLesson lessonId={record.id} onDelete={() => setLessons(prevLessons => prevLessons.filter(lesson => lesson.id !== record.id))} />
                    </td>
                  </>
                ) : (
                  <td colSpan="3" className="text-center" style={{ backgroundColor: '#007bff', color: 'white', padding: '8px 15px', margin: '10px 0', borderRadius: '4px' }}>Message Sent on {record.formattedDate}</td>
                )}
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
      <EditLesson
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        lesson={editLesson}
        lessonDate={lessonDate}
        setLessonDate={setLessonDate}
        setEditLesson={setEditLesson}
        studentId={studentId}
        fetchStudentLessons={fetchStudentLessons}
        fetchStudentTexts={fetchStudentTexts}
        setTexts={setTexts}
        setLessons={setLessons}
      />
    </Modal>
  );
}

export default GetStudentLesson;
