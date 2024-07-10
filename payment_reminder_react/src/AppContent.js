import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Alert } from 'react-bootstrap';
import { api } from './lib/constants';
import GetAllStudents from './components/Student/GetAllStudents';
import EditStudent from './components/Student/EditStudent';
import AddStudent from './components/Student/AddStudent';
import DeleteStudent from './components/Student/DeleteStudent';
import InactiveStudents from './components/Student/InactiveStudents';
import GetStudentHistory from './components/Lesson/GetStudentHistory';
import GetAllLessons from './components/Lesson/GetAllLessons';
import AddLesson from './components/Lesson/AddLesson';
import Header from './components/Header';
import Footer from './components/Footer';
import SendText from './components/Text/SendText';

function AppContent() {
  // State variables
  const [students, setStudents] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [resets, setResets] = useState([]);
  const [texts, setTexts] = useState([]);
  const [studentSelected, setStudentSelected] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    studentId: null,
    studentName: '',
    parentName: '',
    showAddStudentForm: false,
    showEditStudentForm: false,
    showDeleteStudentModal: false,
    showAllLessons: false,
    showAddLessonModal: false,
    showStudentHistoryModal: false,
    showSendTextModal: false,
    showInactiveStudentModal: false,
    sendTextDate: null
  });

  // Fetch initial data
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch all data
  const fetchData = async () => {
    try {
      const [studentsResponse, lessonsResponse, resetsResponse, textResponse] = await Promise.all([
        api.get(`/student/`),
        api.get(`/lesson/`),
        api.get(`/reset/`),
        api.get(`/text/`)
      ]);
      const studentsData = studentsResponse.data;
      const lessonsData = lessonsResponse.data;
      const resetsData = resetsResponse.data;
      const textData = textResponse.data;

      // Order students by alphabetical order
      setStudents(studentsData.sort((a, b) => a.student_name.localeCompare(b.student_name)));
      setLessons(lessonsData);
      setResets(resetsData);
      setTexts(textData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.response?.data?.message || 'Error getting data');
    }
  };

  // Fetch student data
  const fetchStudentData = async () => {
    try {
      const studentsResponse = await api.get(`/student/`);
      const studentsData = studentsResponse.data;
      // order students by alphabetical order
      setStudents(studentsData.sort((a, b) => a.student_name.localeCompare(b.student_name)));
    } catch (error) {
      console.error('Error fetching student data:', error);
      setError(error.response?.data?.message || 'Error getting student data');
    }
  };

  // Event handlers
  const handleAddStudentClick = () => {
    setData({ ...data, showAddStudentForm: true });
  };

  const handleEditStudentClick = (student) => {
    setStudentSelected(student);
    setData({ ...data, showEditStudentForm: true });
  };

  const handleDeleteStudentClick = (student) => {
    setStudentSelected(student);
    setData({ ...data, showDeleteStudentModal: true });
  };

  const handleViewStudentHistoryClick = (student) => {
    setData({
      ...data,
      studentId: student.id,
      studentName: student.student_name,
      showStudentHistoryModal: true
    });
  };

  const handleAllLessons = () => {
    setData({ ...data, showAllLessons: true });
  };

  // Helper function to get the most recent reset date for a student
  const getLatestResetDate = (studentId) => {
    const studentResets = resets.filter((reset) => reset.student_id === studentId);

    const resetDates = studentResets.map((reset) => reset.date).filter((date) => date !== null);

    return resetDates.length > 0 ? Math.max(...resetDates.map((date) => new Date(date))) : null;
  };

  // Helper function to get the most recent send text date for a student
  const getLatestTextDate = (studentId) => {
    const studentTexts = texts.filter((textDate) => textDate.student_id === studentId);
    const textDates = studentTexts.map((text) => text.date).filter((date) => date !== null);

    return textDates.length > 0 ? Math.max(...textDates.map((date) => new Date(date))) : null;
  };

  const getFilteredLessonDates = (studentId) => {
    const latestResetDate = getLatestResetDate(studentId);
    const latestTextDate = getLatestTextDate(studentId);

    // Calculate the cutoff date based on the latest reset date and text date
    const cutoffDate = new Date(Math.max(latestResetDate ?? 0, latestTextDate ?? 0));

    // Get today's date in the Pacific Time Zone (Los Angeles Time)
    const today = new Date().toLocaleDateString('en-US', {
      timeZone: 'America/Los_Angeles'
    });

    // Filter lessons based on student ID, lesson date, current date, and map to lesson dates
    const filteredLessonDates = lessons
      .filter(
        (lesson) =>
          lesson.student_id === studentId &&
          lesson.date !== null &&
          new Date(lesson.date) > cutoffDate &&
          new Date(lesson.date) <= new Date(today)
      )
      .map((lesson) => lesson.date); // Return the list of filtered lesson dates

    return filteredLessonDates;
  };

  const getLessonCountForStudent = (studentId) => {
    const latestResetDate = getLatestResetDate(studentId);
    const latestTextDate = getLatestTextDate(studentId);

    let filterDate = null;

    if (latestResetDate && latestTextDate) {
      filterDate = new Date(Math.max(latestResetDate, latestTextDate));
    } else if (latestResetDate) {
      filterDate = new Date(latestResetDate);
    } else if (latestTextDate) {
      filterDate = new Date(latestTextDate);
    }

    const filteredLessons = lessons.filter(
      (lesson) =>
        lesson.student_id === studentId &&
        lesson.date !== null &&
        (!filterDate || new Date(lesson.date) > filterDate)
    ).length;

    return filteredLessons;
  };

  const getStudentSubscriptionCount = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    return student?.subscription_number ?? 0;
  };

  const getStudentSubscriptionAmount = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    return student?.subscription_price ?? 0;
  };

  const handleAddLessonClick = (student) => {
    setData({ ...data, studentId: student.id, showAddLessonModal: true });
  };

  const handleSendTextClick = (student) => {
    setData({
      ...data,
      showSendTextModal: true,
      studentId: student.id,
      studentName: student.student_name,
      parentName: student.parent_name
    });
  };

  const handleInactiveStudentsClick = (student) => {
    setData({ ...data, studentId: student.id, showInactiveStudentModal: true });
  };

  const handleCloseAddLessonModal = () => {
    setData({ ...data, showAddLessonModal: false, studentId: null });
  };

  const handleCloseStudentHistoryModal = () => {
    setData({
      ...data,
      showStudentHistoryModal: false,
      studentId: null,
      studentName: null
    });
  };

  const handleCloseSendTextModal = () => {
    setData({
      ...data,
      showSendTextModal: false,
      studentId: null,
      studentName: null
    });
  };

  const handleUpdateData = (updatedData) => {
    setData({ ...data, ...updatedData });
  };

  return (
    <Container>
      {/* Header */}
      <Row className="mt-5">
        <Header
          onAddStudentClick={handleAddStudentClick}
          onAllLessonsClick={handleAllLessons}
          onSearch={setSearchName}
        />
      </Row>
      {error && <Alert variant="danger">{error}</Alert>}
      {/* Components */}
      <GetAllStudents
        students={students}
        onEditStudentClick={handleEditStudentClick}
        onDeleteStudentClick={handleDeleteStudentClick}
        onViewStudentHistoryClick={handleViewStudentHistoryClick}
        getLessonCountForStudent={getLessonCountForStudent}
        onAddLessonClick={handleAddLessonClick}
        onSendTextClick={handleSendTextClick}
        searchName={searchName}
      />
      <Footer onInactiveStudentsClick={handleInactiveStudentsClick} />
      {/* Add Student Modal is conditionally rendered if showAddStudentForm is truthy */}
      {data.showAddStudentForm && (
        <AddStudent
          onClose={() => handleUpdateData({ showAddStudentForm: false })}
          onAdd={() => {
            fetchStudentData();
            handleUpdateData({ showAddStudentForm: false });
          }}
        />
      )}
      {/* Get All Lesson Modal is conditionally rendered if showAllLessons is truthy */}
      {data.showAllLessons && (
        <GetAllLessons onClose={() => handleUpdateData({ showAllLessons: false })} />
      )}
      {/* Edit Student Modal is conditionally rendered if showEditStudentForm is truthy */}
      {data.showEditStudentForm && (
        <EditStudent
          student={studentSelected}
          onClose={() => handleUpdateData({ showEditStudentForm: false })}
          onEdit={() => {
            fetchStudentData();
          }}
        />
      )}
      {/* Add Lesson Modal is conditionally rendered if showAddLessonModal is truthy */}
      {data.showAddLessonModal && (
        <AddLesson
          students={students}
          studentId={data.studentId}
          onUpdate={fetchData}
          onClose={handleCloseAddLessonModal}
        />
      )}
      {/* Get Student Lesson Modal is conditionally rendered if showStudentHistoryModal is truthy */}
      {data.showStudentHistoryModal && (
        <GetStudentHistory
          studentId={data.studentId}
          studentName={data.studentName}
          lessons={lessons}
          sendTextDate={data.sendTextDate}
          onClose={() => {
            fetchData();
            handleCloseStudentHistoryModal();
          }}
        />
      )}
      {/* Send Text Modal is conditionally rendered if showSendTextModal is truthy */}
      {data.showSendTextModal && (
        <SendText
          studentId={data.studentId}
          studentName={data.studentName}
          parentName={data.parentName}
          studentLessonCount={getLessonCountForStudent(data.studentId)}
          studentSusbscriptionCount={getStudentSubscriptionCount(data.studentId)}
          studentFilteredLessonDates={getFilteredLessonDates(data.studentId)}
          studentSubscriptionAmount={getStudentSubscriptionAmount(data.studentId)}
          onClose={handleCloseSendTextModal}
        />
      )}
      {/* Delete Student Modal is conditionally rendered if showDeleteStudentModal is truthy */}
      {data.showDeleteStudentModal && (
        <DeleteStudent
          student={studentSelected}
          onCancel={() => {
            handleUpdateData({ showDeleteStudentModal: false });
          }}
          onDelete={() => {
            fetchStudentData();
            handleUpdateData({ showDeleteStudentModal: false });
          }}
        />
      )}
      {/* Inactive Student Modal is conditionally rendered if showInactiveStudentModal is truthy */}
      {data.showInactiveStudentModal && (
        <InactiveStudents
          onClose={() => {
            handleUpdateData({ showInactiveStudentModal: false });
          }}
          onActivate={() => {
            fetchStudentData();
            handleUpdateData({ showInactiveStudentModal: false });
          }}
        />
      )}
    </Container>
  );
}

export default AppContent;
