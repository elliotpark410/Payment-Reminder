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
  const [lessons, setLessons] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [deleteStudent, setDeleteStudent] = useState(null);
  const [formData, setFormData] = useState({
    studentId: null,
    selectedStudentId: null,
    studentName: '',
    showAddStudentForm: false,
    showEditStudentForm: false,
    showAllLessons: false,
    showAddLessonModal: false
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [studentsResponse, lessonsResponse] = await Promise.all([
        fetch(`${host}/student/`),
        fetch(`${host}/lesson/`),
      ]);
      const studentsData = await studentsResponse.json();
      const lessonsData = await lessonsResponse.json();
      setStudents(studentsData.sort((a, b) => a.student_name.localeCompare(b.student_name)));
      setLessons(lessonsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddStudentClick = () => {
    setFormData({ ...formData, showAddStudentForm: true });
  };

  const handleEditStudentClick = (student) => {
    setEditStudent(student);
    setFormData({ ...formData, showEditStudentForm: true });
  };

  const handleDeleteStudentClick = (student) => {
    setDeleteStudent(student);
  };

  const handleStudentLessonsClick = (student) => {
    setFormData({
      ...formData,
      studentId: student.id,
      selectedStudentId: student.id,
      studentName: student.student_name
    });
  };

  const handleCloseLessonHistory = () => {
    setFormData({ ...formData, studentId: null });
  };

  const handleReminderClick = (student) => {
    console.log('Sending reminder for student', student);
  };

  const handleAllLessons = () => {
    setFormData({ ...formData, showAllLessons: true });
  };

  const getLessonCountForStudent = (studentId) => {
    return lessons.filter((lesson) => lesson.student_id === studentId).length;
  };

  const handleAddLesson = (student) => {
    setFormData({ ...formData, selectedStudentId: student.id, showAddLessonModal: true });
  };

  const handleCloseAddLessonModal = () => {
    setFormData({ ...formData, showAddLessonModal: false, selectedStudentId: null });
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col className="text-center">
          <h1>Payment Reminder</h1>
        </Col>
        <Col className="text-left">
          <Button variant="primary" onClick={handleAddStudentClick}>
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
        handleEditStudentClick={handleEditStudentClick}
        handleDeleteStudentClick={handleDeleteStudentClick}
        handleStudentLessonsClick={handleStudentLessonsClick}
        handleReminderClick={handleReminderClick}
        getLessonCountForStudent={getLessonCountForStudent}
        handleAddLesson={handleAddLesson}
      />
      {formData.showEditStudentForm && (
        <EditStudent
          student={editStudent}
          onClose={() => setFormData({ ...formData, showEditStudentForm: false })}
          onUpdate={() => {
            fetchData();
            setFormData({ ...formData, showEditStudentForm: false });
          }}
        />
      )}
      {formData.showAddStudentForm && (
        <AddStudent
          onClose={() => setFormData({ ...formData, showAddStudentForm: false })}
          onAdd={() => {
            fetchData();
            setFormData({ ...formData, showAddStudentForm: false });
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
      {formData.studentId && (
        <GetStudentLesson
          studentId={formData.studentId}
          studentName={formData.studentName}
          lessons={lessons}
          onClose={handleCloseLessonHistory}
        />
      )}
      {formData.showAllLessons && (
        <GetAllLessons
          onClose={() => setFormData({ ...formData, showAllLessons: false })}
        />
      )}
      {formData.showAddLessonModal && (
        <AddLesson
          studentId={formData.selectedStudentId}
          onClose={handleCloseAddLessonModal}
          onAdd={() => {
            fetchData();
            handleCloseAddLessonModal();
          }}
        />
      )}
    </Container>
  );
}

export default App;
