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

function AppContent() {
  // State variables
  const [students, setStudents] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [texts, setTexts] = useState([]);
  const [studentSelected, setStudentSelected] = useState(null);
  const [data, setData] = useState({
    studentId: null,
    studentName: '',
    parentName: '',
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
      const [studentsResponse, lessonsResponse, textResponse] = await Promise.all([
        fetch(`${host}/student/`),
        fetch(`${host}/lesson/`),
        fetch(`${host}/text/`),
      ]);
      const studentsData = await studentsResponse.json();
      const lessonsData = await lessonsResponse.json();
      const textData = await textResponse.json();

      // Filter deleted records
      const activeStudents = studentsData.filter(
        (student) => {
          return student.deleted_at === null;
      });

      const activeLessons = lessonsData.filter(
        (lesson) => {
          return lesson.deleted_at === null;
      });

      // order students by alphabetical order
      setStudents(activeStudents.sort((a, b) => a.student_name.localeCompare(b.student_name)));
      setLessons(activeLessons);
      setTexts(textData);
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
    setStudentSelected(student);
    setData({ ...data, showEditStudentForm: true });
  };

  const handleDeleteStudentClick = (student) => {
    setStudentSelected(student);
    setData({ ...data, showDeleteStudentModal: true });
  };

  const handleViewStudentLessonsClick = (student) => {
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

  // Helper function to get the most recent reset date for a student
  const getLatestResetDate = (studentId) => {
    const studentLessons = lessons.filter((lesson) => lesson.student_id === studentId);
    const resetDates = studentLessons
      .map((lesson) => lesson.reset_lesson_date)
      .filter((date) => date !== null);

    return resetDates.length > 0 ? Math.max(...resetDates.map((date) => new Date(date))) : null;
  };

  // Helper function to get the most recent send text date for a student
  const getLatestTextDate = (studentId) => {
    const studentTexts = texts.filter((textDate) => textDate.student_id === studentId);
    const textDates = studentTexts
      .map((text) => text.created_date)
      .filter((date) => date !== null);

    return textDates.length > 0 ? Math.max(...textDates.map((date) => new Date(date))) : null;
  };

  const getFilteredLessonDates = (studentId) => {
    const latestResetDate = getLatestResetDate(studentId);
    const latestTextDate = getLatestTextDate(studentId);

    const cutoffDate = new Date(Math.max(latestResetDate ?? 0, latestTextDate ?? 0));

    const filteredLessonDates = lessons
      .filter(
        (lesson) =>
          lesson.student_id === studentId &&
          lesson.lesson_date !== null &&
          new Date(lesson.lesson_date) > cutoffDate
      )
      .map((lesson) => lesson.lesson_date); // Return the list of filtered lesson dates

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
        lesson.lesson_date !== null &&
        (!filterDate || new Date(lesson.lesson_date) > filterDate)
    ).length;

    return filteredLessons
  };

  const getStudentSubscriptionCount = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    return student?.number_of_lessons_in_subscription ?? 0;
  };

  const getStudentSubscriptionAmount = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    return student?.subscription_price ?? 0;
  };

  const handleAddLessonClick = (student) => {
    setData({ ...data, studentId: student.id, showAddLessonModal: true });
  };

  const handleSendTextClick = (student) => {
    setData({ ...data, showSendTextModal: true, studentId: student.id, studentName: student.student_name, parentName: student.parent_name });
  };

  const handleCloseAddLessonModal = () => {
    setData({ ...data, showAddLessonModal: false, studentId: null });
  };

  const handleCloseStudentLessonsModal = () => {
    setData({ ...data, showStudentLessonModal: false, studentId: null, studentName: null });
  };

  const handleCloseSendTextModal = () => {
    setData({ ...data, showSendTextModal: false, studentId: null, studentName: null });
  };

  const handleUpdateData = (updatedData) => {
    setData({ ...data, ...updatedData});
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
        onViewStudentLessonsClick={handleViewStudentLessonsClick}
        getLessonCountForStudent={getLessonCountForStudent}
        resetLessonCountForStudentClick={fetchData}
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
          student={studentSelected}
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
        parentName={data.parentName}
        studentLessonCount={getLessonCountForStudent(data.studentId)}
        studentSusbscriptionCount={getStudentSubscriptionCount(data.studentId)}
        studentFilteredLessonDates={getFilteredLessonDates(data.studentId)}
        studentSubscriptionAmount={getStudentSubscriptionAmount(data.studentId)}
        onClose={handleCloseSendTextModal} />
      )}
      {/* Delete Student Modal is conditionally rendered if showDeleteStudentModal is truthy */}
      {data.showDeleteStudentModal && (
        <DeleteStudent
          student={studentSelected}
          onCancel={() => {
            handleUpdateData({ showDeleteStudentModal: false });
          }}
          onDelete={() => {
            fetchData();
            handleUpdateData({ showDeleteStudentModal: false });
          }}
        />
      )}

    </Container>
  );
}

export default AppContent;
