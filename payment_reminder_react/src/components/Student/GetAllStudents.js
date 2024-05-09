import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { host } from '../../lib/constants';
import { formatInTimeZone } from 'date-fns-tz';

const rowStyle = (index) => ({
  borderBottom: '1px solid lightgray', // Thin, faint divider
  backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff', // Alternating background colors
});

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

  return (
    <Row style={rowStyle(index)} className="py-2">
      <Col>
          {index + 1}
      </Col>
      <Col>
        <div onClick={() => onEdit(student)} style={{ padding: '10px', cursor: 'pointer' }}>
          <p>{student.student_name}</p>
          {/* add inentation for parent */}
          <p>{student.parent_name}</p>
        </div>
      </Col>
      <Col>
        <Button variant="outline-success" title="Add lesson" onClick={() => onAddLesson(student)}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </Col>
      <Col>
        <div className="d-flex align-items-center">
          <div>
            {getLessonCount(student.id) >= student.number_of_lessons_in_subscription - 1 ? (
              <strong>
                <span style={{ color: '#007bff' }}>{getLessonCount(student.id)}</span>
              </strong>
            ) : (
              <span>{getLessonCount(student.id)}</span>
            )}
            {' '}
            / {student.number_of_lessons_in_subscription}
          </div>
        </div>
      </Col>
      <Col>
        <Button variant="outline-warning" title="Reset lesson count" onClick={() => resetLessonCount(student)}>
          <FontAwesomeIcon icon={faSyncAlt} />
        </Button>
      </Col>
      <Col>
        <Button variant="outline-success" title="View lessons" onClick={() => onViewLessons(student)}>
          View Lessons
        </Button>
      </Col>
      <Col>
        <Button
          variant={getLessonCount(student.id) < student.number_of_lessons_in_subscription - 1 ? 'outline-secondary' : 'outline-primary'}
          title="Send text"
          onClick={() => onSendText(student)}
          disabled={getLessonCount(student.id) < student.number_of_lessons_in_subscription - 1}
        >
          Send Text
        </Button>
      </Col>
      <Col>
        <Button variant="outline-danger" title="Delete student" onClick={() => onDelete(student)}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </Col>
    </Row>
  );
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
    <Row style={{ borderBottom: '1px solid lightgray' }} className="py-2">
      <Col><strong>Number</strong></Col>
      <Col><strong>Name</strong></Col>
      <Col><strong>Add Lesson</strong></Col>
      <Col><strong>Lessons</strong></Col>
      <Col><strong>Reset</strong></Col>
      <Col><strong>View Lessons</strong></Col>
      <Col><strong>Send Text</strong></Col>
      <Col><strong>Delete</strong></Col>
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
