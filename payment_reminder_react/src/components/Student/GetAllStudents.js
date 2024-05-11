import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { host } from '../../lib/constants';
import { formatInTimeZone } from 'date-fns-tz';

// Function to determine color based on lesson count and subscription limit
const getLessonCountColor = (lessonCount, subscriptionLimit) => {
  if (lessonCount > subscriptionLimit) {
    return 'red'; // If lesson count is greater than subscription limit
  } else if (lessonCount === subscriptionLimit - 1 || lessonCount === subscriptionLimit) {
    return '#007bff'; // Blue for nearly full or full subscription
  } else {
    return 'black'; // Default color for all other cases
  }
};

const StudentItem = ({
  index,
  student,
  onEdit,
  onDelete,
  onViewLessons,
  onAddLesson,
  onSendText,
  getLessonCount,
  onResetLessonCount,
}) => {
  const lessonCount = getLessonCount(student.id);
  const subscriptionLimit = student.number_of_lessons_in_subscription;


  // Function to reset lesson count
  const resetLessonCount = async (student) => {
    try {
      const now = new Date(); // Current local time
      const timeZone = 'America/Los_Angeles';

      // Get date in Pacific Time
      const formattedDate = formatInTimeZone(now, timeZone, 'yyyy-MM-dd');

      await axios.post(`${host}/lesson/reset`, {
        student_id: student.id,
        reset_lesson_date: formattedDate
      });

      // Trigger success callback to refresh data or update the UI
      if (onResetLessonCount) {
        onResetLessonCount();
      }
    } catch (error) {
      console.error('Error resetting lesson count:', error);
      throw error
    }
  };

  const rowStyle = {
    height: '130px',
    paddingTop: '12px',
    paddingBottom: '12px',
    borderBottom: '1px solid lightgray',
    backgroundColor: '#f7f7f7',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    borderRadius: '10px',
  };

  const hoverEffect = {
    backgroundColor: '#ffffff',
    transform: 'scale(1.01)', // Increase for slight zoom-in effect on hover
  };

  return (
    <Row
      style={rowStyle}
      className="align-items-center"
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = hoverEffect.backgroundColor;
        e.currentTarget.style.transform = hoverEffect.transform; // Apply zoom-in effect
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = rowStyle.backgroundColor;
        e.currentTarget.style.transform = 'scale(1)'; // Reset zoom effect
      }}
    >
      <Col className="text-center">
          {index + 1}
      </Col>
      <Col className="text-left">
        <div onClick={() => onEdit(student)} style={{ display: 'flex', flexDirection: 'column', paddingTop: '10px', paddingBottom: '10px', cursor: 'pointer' }}>
          <p style={{ fontSize: '1.2rem', fontWeight: '600', margin: 'auto 0 5px' }}>{student.student_name}</p>
          <p style={{ fontSize: '0.9rem', margin: '0' }}>{student.parent_name}</p>
        </div>
      </Col>
      <Col className="text-center">
        <Button variant="outline-success" title="Add lesson" onClick={() => onAddLesson(student)}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </Col>
      <Col className="text-center">
          <div>
            <span style={{ color: getLessonCountColor(lessonCount, subscriptionLimit) }}>{lessonCount}</span>
            {' '}
            / {student.number_of_lessons_in_subscription}
          </div>
      </Col>
      <Col className="text-center">
        <Button variant="outline-warning" title="Reset lesson count" onClick={() => resetLessonCount(student)}>
          <FontAwesomeIcon icon={faSyncAlt} />
        </Button>
      </Col>
      <Col className="text-center">
        <Button variant="outline-success" title="View lessons" onClick={() => onViewLessons(student)}>
          View Lessons
        </Button>
      </Col>
      <Col className="text-center">
        <Button
          variant={getLessonCount(student.id) < student.number_of_lessons_in_subscription - 1 ? 'outline-secondary' : 'outline-primary'}
          title="Send text"
          onClick={() => onSendText(student)}
          disabled={getLessonCount(student.id) < student.number_of_lessons_in_subscription - 1}
        >
          Send Text
        </Button>
      </Col>
      <Col className="text-center">
        <Button variant="outline-danger" title="Delete student" onClick={() => onDelete(student)}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </Col>
    </Row>
  );
};

const headerRowStyle = {
  borderBottom: '3px solid lightgray',
  paddingTop: '15px',
  paddingBottom: '10px',
  backgroundColor: '#f4f9ff',
  borderRadius: '10px', // Rounded corners
};

const GetAllStudents = ({
  students,
  onEditStudentClick,
  onDeleteStudentClick,
  onViewStudentLessonsClick,
  getLessonCountForStudent,
  onAddLessonClick,
  onSendTextClick,
  resetLessonCountForStudentClick,
}) => (
  <>
    <Row style={headerRowStyle}>
      <Col className="text-center"><strong>Number</strong></Col>
      <Col className="text-ceneter"><strong>Name</strong></Col>
      <Col className="text-center"><strong>Add Lesson</strong></Col>
      <Col className="text-center"><strong>Lessons</strong></Col>
      <Col className="text-center"><strong>Reset</strong></Col>
      <Col className="text-center"><strong>View Lessons</strong></Col>
      <Col className="text-center"><strong>Send Text</strong></Col>
      <Col className="text-center"><strong>Delete</strong></Col>
    </Row>
    {/* Rows of student items */}
    {students.map((student, index) => (
      <StudentItem
        key={student.id}
        index={index}
        student={student}
        onEdit={onEditStudentClick}
        onDelete={onDeleteStudentClick}
        onViewLessons={onViewStudentLessonsClick}
        onAddLesson={onAddLessonClick}
        onSendText={onSendTextClick}
        getLessonCount={getLessonCountForStudent}
        onResetLessonCount={resetLessonCountForStudentClick}
      />
    ))}
  </>
);

export default GetAllStudents;
