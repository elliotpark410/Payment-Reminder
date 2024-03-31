import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { host } from './lib/constants';
import GetAllStudents from './components/Student/GetAllStudents';
import EditStudent from './components/Student/EditStudent';
import AddStudent from './components/Student/AddStudent';
import DeleteStudent from './components/Student/DeleteStudent';
import GetStudentLesson from './components/Lesson/GetStudentLesson';
import GetAllLessons from './components/Lesson/GetAllLessons';
import AddLesson from './components/Lesson/AddLesson';

function App() {
  const [students, setStudents] = useState([]);
  const [lessons, setLessons] = useState([]); // Added lessons state variable
  const [editStudent, setEditStudent] = useState(null);
  const [deleteStudent, setDeleteStudent] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAllLessons, setShowAllLessons] = useState(false);
  const [showAddLessonModal, setShowAddLessonModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [studentName, setStudentName] = useState('');

  useEffect(() => {
    fetchStudentData();
    fetchLessonData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const response = await fetch(`${host}/student/`);
      const data = await response.json();
      const sortedStudents = data.sort((a, b) => a.student_name.localeCompare(b.student_name));
      setStudents(sortedStudents);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchLessonData = async () => {
    try {
      const response = await fetch(`${host}/lesson/`);
      const lessonsData = await response.json();
      setLessons(lessonsData); // Set lessons using the fetched data
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleEditClick = (student) => {
    setEditStudent(student);
    setShowEditForm(true);
  };

  const handleDeleteClick = (student) => {
    setDeleteStudent(student);
  };

  const handleStudentLessonsClick = (student) => {
    setStudentId(student.id);
    setStudentName(student.student_name);
  };

  const handleCloseLessonHistory = () => {
    setStudentId(null);
  };

  const handleReminderClick = (student) => {
    console.log('Sending reminder for student', student);
  };

  const handleAllLessons = () => {
    setShowAllLessons(true);
  };

  const getLessonCountForStudent = (studentId) => {
    return lessons.filter((lesson) => lesson.student_id === studentId).length;
  };

  const handleAddLesson = (student) => {
    setSelectedStudentId(student.id);
    setShowAddLessonModal(true);
  };

  const handleCloseAddLessonModal = () => {
    setShowAddLessonModal(false);
    setSelectedStudentId(null);
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col className="text-center">
          <h1>Payment Reminder</h1>
        </Col>
        <Col className="text-left">
          <Button variant="primary" onClick={handleAddClick}>
            Add Student
          </Button>
        </Col>
        <Col className="text-left">
          <Button variant="secondary" onClick={handleAllLessons}>
            All Lessons
          </Button>
        </Col>
      </Row>
      <GetAllStudents
        students={students}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        handleStudentLessonsClick={handleStudentLessonsClick}
        handleReminderClick={handleReminderClick}
        getLessonCountForStudent={getLessonCountForStudent}
        handleAddLesson={handleAddLesson}
      />
      {showEditForm && (
        <EditStudent
          student={editStudent}
          onClose={() => setShowEditForm(false)}
          onUpdate={() => {
            fetchStudentData();
            setShowEditForm(false);
          }}
        />
      )}
      {showAddForm && (
        <AddStudent
          onClose={() => setShowAddForm(false)}
          onAdd={() => {
            fetchStudentData();
            setShowAddForm(false);
          }}
        />
      )}
      {deleteStudent && (
        <DeleteStudent
          student={deleteStudent}
          onCancel={() => setDeleteStudent(null)}
          onDelete={(deletedStudentId) => {
            setStudents(students.filter((student) => student.id !== deletedStudentId));
            setDeleteStudent(null);
          }}
        />
      )}
      {studentId && (
        <GetStudentLesson
          studentId={studentId}
          studentName={studentName}
          lessons={lessons}
          onClose={handleCloseLessonHistory}
        />
      )}
      {showAllLessons && (
        <GetAllLessons
          onClose={() => setShowAllLessons(false)}
        />
      )}
      {showAddLessonModal && (
        <AddLesson
          studentId={selectedStudentId}
          onClose={handleCloseAddLessonModal}
          onAdd={() => {
            fetchLessonData();
            handleCloseAddLessonModal();
          }}
        />
      )}
    </Container>
  );
}

export default App;
