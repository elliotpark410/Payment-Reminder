import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const StudentItem = ({
  student,
  onEdit,
  onDelete,
  onViewLessons,
  onAddLesson,
  onSendText,
  getLessonCount,
}) => (
  <Row className="mt-3">
    <Col>
      <div onClick={() => onEdit(student)} style={{ padding: '10px', cursor: 'pointer' }}>
        <p>Student: {student.student_name}</p>
        <p className="ml-3">Parent: {student.parent_name}</p>
      </div>
    </Col>
    <Col>
      <Button variant="outline-success" onClick={() => onAddLesson(student)}>
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
      <Button variant="outline-success" onClick={() => onViewLessons(student)}>
        View Lessons
      </Button>
    </Col>
    <Col>
      <Button
        variant={getLessonCount(student.id) < student.number_of_lessons_in_subscription - 1 ? 'outline-secondary' : 'outline-primary'}
        onClick={() => onSendText(student)}
        disabled={getLessonCount(student.id) < student.number_of_lessons_in_subscription - 1}
      >
        Send Text
      </Button>
    </Col>
    <Col>
      <Button variant="outline-danger" onClick={() => onDelete(student)}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </Col>
  </Row>
);

const GetAllStudents = ({
  students,
  onEditStudentClick,
  onDeleteStudentClick,
  onViewStudentLessonsClick,
  getLessonCountForStudent,
  onAddLessonClick,
  onSendTextClick,
}) => (
  <>
    {/* Row of column headers */}
    <Row className="mt-3">
      <Col>
        <strong>Student Info</strong>
      </Col>
      <Col>
        <strong>Add Lesson</strong>
      </Col>
      <Col>
        <strong>Lesson Count</strong>
      </Col>
      <Col>
        <strong>View Lessons</strong>
      </Col>
      <Col>
        <strong>Send Text</strong>
      </Col>
      <Col>
        <strong>Delete</strong>
      </Col>
    </Row>
    {/* Rows of student items */}
    {students.map((student) => (
      <StudentItem
        key={student.id}
        student={student}
        onEdit={onEditStudentClick}
        onDelete={onDeleteStudentClick}
        onViewLessons={onViewStudentLessonsClick}
        onAddLesson={onAddLessonClick}
        onSendText={onSendTextClick}
        getLessonCount={getLessonCountForStudent}
      />
    ))}
  </>
);

export default GetAllStudents;
