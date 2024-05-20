import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { host } from '../../lib/constants';
import DeleteLesson from './DeleteLesson';
import EditLesson from './EditLesson';
import '../../App.css';
import { formatDate } from '../../lib/util';

const fetchStudentLessons = async (studentId, setLessons) => {
  try {
    const response = await axios.get(`${host}/lesson/student/${studentId}`);

    // Filter out records with null or invalid lesson_date
    const validLessons = response.data.filter((lesson) => {
      return lesson.lesson_date !== null && lesson.lesson_date !== undefined && lesson.deleted_at === null;
    });

    // Sort the valid records by lesson_date
    const sortedLessons = validLessons.sort(
      (a, b) => new Date(a.lesson_date) - new Date(b.lesson_date)
    );

    // Format the sorted lessons
    const formattedLessons = sortedLessons.map((lesson, index) => ({
      ...lesson,
      lesson: true,
      lessonNumber: index + 1,
      formattedDate: formatDate(lesson.lesson_date)
    }));

    // Set the filtered and formatted lessons
    setLessons(formattedLessons);
  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw error;
  }
};

const fetchStudentResetLessons = async (studentId, setResetLessons) => {
  try {
    // Fetch data from the API
    const response = await axios.get(`${host}/lesson/student/${studentId}`);

    // Filter out records with null or undefined reset_lesson_date
    const validResetLessons = response.data.filter(
      (resetLesson) => resetLesson.reset_lesson_date !== null && resetLesson.reset_lesson_date !== undefined && resetLesson.deleted_at === null
    );

    // Sort the valid records by reset_lesson_date
    const sortedResetLessons = validResetLessons.sort(
      (a, b) => new Date(a.reset_lesson_date) - new Date(b.reset_lesson_date)
    );

    // Format the sorted lessons
    const formattedResetLessons = sortedResetLessons.map((resetLesson) => ({
      ...resetLesson,
      resetLesson: true,
      formattedDate: formatDate(resetLesson.reset_lesson_date)
    }));

    // Update the state with the filtered, sorted, and formatted reset lessons
    setResetLessons(formattedResetLessons);
  } catch (error) {
    console.error('Error fetching reset lessons:', error);
    throw error;
  }
};

const fetchStudentTexts = async (studentId, setTexts) => {
  try {
    // Fetch data from the API
    const response = await axios.get(`${host}/text/student/${studentId}`);

    // Filter out records with null or undefined dates
    const validTexts = response.data.filter(
      (text) => text.created_date !== null && text.created_date !== undefined
    );

    // Format the valid texts and sort them
    const formattedTexts = validTexts.map((text) => ({
      ...text,
      text: true,
      formattedDate: formatDate(text.created_date)
    }));

    // Set the texts in the state
    setTexts(formattedTexts);
  } catch (error) {
    console.error('Error fetching texts:', error);
    throw error;
  }
};

function GetStudentLesson({ studentId, studentName, onClose }) {
  const [lessons, setLessons] = useState([]);
  const [resetLessons, setResetLessons] = useState([]);
  const [texts, setTexts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editLesson, setEditLesson] = useState(null);
  const [lessonDate, setLessonDate] = useState('');

  useEffect(() => {
    fetchStudentLessons(studentId, setLessons);
    fetchStudentResetLessons(studentId, setResetLessons);
    fetchStudentTexts(studentId, setTexts);
  }, [studentId]);

  const handleEditLesson = (lesson) => {
    setEditLesson(lesson);
    setLessonDate(new Date(lesson.lesson_date).toISOString().slice(0, 10));
    setShowEditModal(true);
  };

  const mergedRecords = [...lessons, ...resetLessons, ...texts].sort((a, b) => new Date(a.formattedDate) - new Date(b.formattedDate));

  // Function to reset lesson numbers after each text or reset record
  const assignLessonNumbers = (records) => {
    let currentLessonNumber = 0; // Start lesson counter

    return records.map((record) => {
      if (record.lesson) {
        currentLessonNumber += 1; // Increment for each lesson
        return { ...record, lessonNumber: currentLessonNumber }; // Assign the updated lesson number
      } else {
        // Reset counter if a "text" or "reset lesson" is encountered
        currentLessonNumber = 0;
        return record; // Just return the record
      }
    });
  };

  const recordsWithLessonNumbers = assignLessonNumbers(mergedRecords);

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
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {recordsWithLessonNumbers.map((record, index) => {
              const uniqueKey = `${record.id}-${index}`;
              // lesson records
              if (record.lesson) {
                return (
                  <tr key={uniqueKey}>
                    <td>{record.lessonNumber}</td>
                    <td onClick={() => handleEditLesson(record)}>{record.formattedDate}</td>
                    <td>
                      <DeleteLesson
                        lessonId={record.id}
                        onDelete={() =>
                          setLessons((prevLessons) =>
                            prevLessons.filter((lesson) => lesson.id !== record.id)
                          )
                        }
                      />
                    </td>
                  </tr>
                );
                // text message records
              } else if (record.text) {
                return (
                  <tr key={uniqueKey}>
                    <td
                      colSpan="2"
                      className="text-center"
                      style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        padding: '8px 15px',
                        borderRadius: '4px',
                        height: '55px',
                      }}
                      >
                        Message sent on {record.formattedDate}
                    </td>
                    <td colSpan="1"></td>
                  </tr>
                );
              } else {
                // lesson reset records
                return (
                  <tr key={uniqueKey}>
                    <td
                      colSpan="2"
                      className="text-center"
                      style={{
                      backgroundColor: '#FFC107',
                      color: 'black',
                      padding: '8px 15px',
                      borderRadius: '4px',
                      }}
                    >
                      Lesson reset on {record.formattedDate}
                    </td>
                    <td>
                      <DeleteLesson
                        lessonId={record.id}
                        onDelete={() =>
                          setResetLessons((prevLessons) =>
                            prevLessons.filter((lesson) => lesson.id !== record.id)
                          )
                        }
                      />
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <div style={{ flex: 1, textAlign: 'left', fontSize: '16px' }}>
        Total Lessons: <span style={{ fontWeight: 'bold' }}>{lessons.length}</span>
        </div>
        <Button
          className="button"
          variant="secondary"
          onClick={onClose}
        >
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
