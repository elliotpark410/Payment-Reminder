import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faSyncAlt, faList, faComment } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { host } from '../../lib/constants';
import { todaysDate } from '../../lib/util';
import { formatInTimeZone } from 'date-fns-tz';
import '../../App.css';

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

// Function to reset lesson count
const resetLessonCount = async (student) => {
  try {
    const now = new Date(); // Current local time
    const timeZone = 'America/Los_Angeles';

    // Get date in Pacific Time
    const formattedDate = formatInTimeZone(now, timeZone, 'yyyy-MM-dd');

    const response = await axios.post(`${host}/lesson/reset`, {
      student_id: student.id,
      reset_lesson_date: formattedDate
    });

    if (response.status === 200 || 201) {
      const today = todaysDate();

      // Show notifcation
      toast.warning(`Lesson reset on ${today}`, {
        autoClose: 4000, // Close after 3 seconds
      });
    } else {
      console.error('Error resetting lesson count. Unexpected response:', response);
    };
  } catch (error) {
    console.error('Error resetting lesson count:', error);
    throw error
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
}) => {
  const lessonCount = getLessonCount(student.id);
  const subscriptionLimit = student.number_of_lessons_in_subscription;

  const rowStyle = {
    height: '110px',
    paddingTop: '12px',
    paddingBottom: '12px',
    border: '1px solid lightgray',
    backgroundColor: '#f7f7f7',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    borderRadius: '10px',
    overflow: 'hidden',
  };

  const hoverEffect = {
    backgroundColor: '#ffffff',
    transform: 'scale(1.02)', // Increase for slight zoom-in effect on hover
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
      <Col xs={2} className="text-left">
        <div className="studentDiv" onClick={() => onEdit(student)}>
          <p className="studentName">{student.student_name}</p>
          <p className="parentName">{student.parent_name}</p>
        </div>
      </Col>
      <Col className="text-center">
        <Button variant="outline-success" title="Add lesson" onClick={() => onAddLesson(student)}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </Col>
      <Col className="text-center">
          <div style={{ fontSize: '1.2em' }}>
            <span style={{ color: getLessonCountColor(lessonCount, subscriptionLimit), fontWeight: '600' }}>{lessonCount}</span>
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
        <Button
        style={{ width: '120px' }}
        variant="outline-success"
        title="View lessons"
        onClick={() => onViewLessons(student)}>
          <FontAwesomeIcon icon={faList} style={{ marginRight: '0.5em' }} />
          History
        </Button>
      </Col>
      <Col className="text-center">
        <Button
          style={{ width: '120px' }}
          variant={getLessonCount(student.id) < student.number_of_lessons_in_subscription - 1 ? 'outline-secondary' : 'outline-primary'}
          title="Text"
          onClick={() => onSendText(student)}
          disabled={getLessonCount(student.id) < student.number_of_lessons_in_subscription - 1}
        >
          <FontAwesomeIcon icon={faComment} style={{ marginRight: '0.5em' }} />
          Text
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
  borderBottom: '3px solid gray',
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
  searchName,
}) => {
  const filteredStudents = students.filter((student) =>
    student.student_name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <>
      <div className="studentListContainer">
        <Row style={headerRowStyle}>
          <Col className="text-center"><strong>Number</strong></Col>
          <Col xs={2} className="text-left"><strong>Name</strong></Col>
          <Col className="text-center"><strong>Add</strong></Col>
          <Col className="text-center"><strong>Count</strong></Col>
          <Col className="text-center"><strong>Reset</strong></Col>
          <Col className="text-center"><strong>View</strong></Col>
          <Col className="text-center"><strong>Send</strong></Col>
          <Col className="text-center"><strong>Delete</strong></Col>
        </Row>
        {/* Rows of student items */}
        {filteredStudents.map((student, index) => (
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
          />
        ))}
      </div>
    </>
  );
};

export default GetAllStudents;
