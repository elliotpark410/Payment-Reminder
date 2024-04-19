import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';
import { host } from './lib/constants';
import GetAllStudents from './components/Student/GetAllStudents';
import EditStudent from './components/Student/EditStudent';
import AddStudent from './components/Student/AddStudent';
import DeleteStudent from './components/Student/DeleteStudent';
import GetStudentLesson from './components/Lesson/GetStudentLesson';
import GetAllLessons from './components/Lesson/GetAllLessons';
import AddLesson from './components/Lesson/AddLesson';
import Header from './components/Header';
import SendText from './components/Text/SendText';

function App() {
  // State variables
  const [students, setStudents] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [deleteStudent, setDeleteStudent] = useState(null);
  const [data, setData] = useState({
    studentId: null,
    studentName: '',
    showAddStudentForm: false,
    showEditStudentForm: false,
    showDeleteStudentModal: false,
    showAllLessons: false,
    showAddLessonModal: false,
    showStudentLessonModal: false,
    showSendTextModal: false,
    sendTextDate: null,
  });

  // fetch initial data
  useEffect(() => {
    fetchData();
  }, []);

  // fetch students and lessons data
  const fetchData = async () => {
    try {
      const [studentsResponse, lessonsResponse] = await Promise.all([
        fetch(`${host}/student/`),
        fetch(`${host}/lesson/`),
      ]);
      const studentsData = await studentsResponse.json();
      const lessonsData = await lessonsResponse.json();
      // order students by alphabetical order
      setStudents(studentsData.sort((a, b) => a.student_name.localeCompare(b.student_name)));
      setLessons(lessonsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  // Event handlers
  const handleAddStudentClick = () => {
    setData({ ...data, showAddStudentForm: true });
  };

  const handleEditStudentClick = (student) => {
    setEditStudent(student);
    setData({ ...data, showEditStudentForm: true });
  };

  const handleDeleteStudentClick = (student) => {
    setDeleteStudent(student);
    setData({ ...data, showDeleteStudentModal: true });
  };

  const handleStudentLessonsClick = (student) => {
    setData({
      ...data,
      studentId: student.id,
      studentName: student.student_name,
      showStudentLessonModal: true
    });
  };

  const handleAllLessons = () => {
    setData({ ...data, showAllLessons: true });
  };

  // TODO: update this function to get lesson count up to send text message / clear button
  const getLessonCountForStudent = (studentId) => {
    return lessons.filter((lesson) => lesson.student_id === studentId).length;
  };

  const handleAddLessonClick = (student) => {
    setData({ ...data, studentId: student.id, showAddLessonModal: true });
  };

  const handleCloseAddLessonModal = () => {
    setData({ ...data, showAddLessonModal: false, studentId: null });
  };

  const handleCloseStudentLessonsModal = () => {
    setData({ ...data, showStudentLessonModal: false, studentId: null, studentName: null });
  };


  const handleUpdateData = (updatedData) => {
    setData({ ...data, ...updatedData});
  };

  const handleSendTextClick = (student) => {
    setData({ ...data, showSendTextModal: true, studentId: student.id, studentName: student.student_name });
  };

  const handleCloseSendTextModal = () => {
    setData({ ...data, showSendTextModal: false, studentId: null, studentName: null });
  };

  return (
    <Container>
      {/* Header */}
      <Row className="mt-5">
        <Header
          onAddStudentClick={handleAddStudentClick}
          onAllLessonsClick={handleAllLessons}
        />
      </Row>
      {/* Components */}
      <GetAllStudents
        students={students}
        onEditStudentClick={handleEditStudentClick}
        onDeleteStudentClick={handleDeleteStudentClick}
        onStudentLessonsClick={handleStudentLessonsClick}
        getLessonCountForStudent={getLessonCountForStudent}
        onAddLessonClick={handleAddLessonClick}
        onSendTextClick={handleSendTextClick}
      />
      {/* Add Student Modal is conditionally rendered if showAddStudentForm is truthy */}
      {data.showAddStudentForm && (
        <AddStudent
        onClose={() => handleUpdateData({ showAddStudentForm: false })}
        onAdd={() => {
          fetchData();
          handleUpdateData({ showAddStudentForm: false });
        }}
        />
      )}
      {/* Get All Lesson Modal is conditionally rendered if showAllLessons is truthy */}
      {data.showAllLessons && (
        <GetAllLessons
          onClose={() => handleUpdateData({ showAllLessons: false })}
        />
      )}
       {/* Edit Student Modal is conditionally rendered if showEditStudentForm is truthy */}
       {data.showEditStudentForm && (
        <EditStudent
          student={editStudent}
          onClose={() => handleUpdateData({showEditStudentForm: false })}
          onEdit={() => {
            fetchData();
            handleUpdateData({ showEditStudentForm: false });
          }}
        />
      )}
      {/* Add Lesson Modal is conditionally rendered if showAddLessonModal is truthy */}
      {data.showAddLessonModal && (
        <AddLesson
          studentId={data.studentId}
          onClose={handleCloseAddLessonModal}
          onAdd={() => {
            fetchData();
            handleCloseAddLessonModal();
          }}
        />
      )}
      {/* Get Student Lesson Modal is conditionally rendered if showStudentLessonModal is truthy */}
      {data.showStudentLessonModal && (
        <GetStudentLesson
          studentId={data.studentId}
          studentName={data.studentName}
          lessons={lessons}
          sendTextDate={data.sendTextDate}
          onClose={() => {
            fetchData();
            handleCloseStudentLessonsModal();
          }}
        />
      )}
      {/* Send Text Modal is conditionally rendered if showSendTextModal is truthy */}
      {data.showSendTextModal && (
        <SendText
        studentId={data.studentId}
        studentName={data.studentName}
        onClose={handleCloseSendTextModal} />
      )}
      {/* Delete Student Modal is conditionally rendered if showDeleteStudentModal is truthy */}
      {data.showDeleteStudentModal && (
        <DeleteStudent
          student={deleteStudent}
          onCancel={() => setDeleteStudent(null)}
          onDelete={() => {
            fetchData();
            handleUpdateData({ showDeleteStudentModal: false });
          }}
        />
      )}

    </Container>
  );
}

export default App;
