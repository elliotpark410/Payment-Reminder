import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const GetAllStudents = ({
  students,
  handleEditClick,
  handleDeleteClick,
  handleStudentLessonsClick,
  handleReminderClick,
  getLessonCountForStudent,
  handleAddLesson,
}) => {
  return (
    <>
      {students.map((student, index) => (
        <Row
          className="mt-3"
          key={student.id}
          style={{
            borderBottom: index !== students.length - 1 ? '1px solid #ccc' : 'none',
          }}
        >
          <Col>
            <div
              onClick={() => handleEditClick(student)}
              style={{ padding: '10px', cursor: 'pointer' }}
            >
              <p>Student: {student.student_name}</p>
              <p className="ml-3">Parent: {student.parent_name}</p>
            </div>
          </Col>

          <Col>
            <div>
              <Button
                variant="outline-success"
                onClick={() => handleAddLesson(student)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </div>
          </Col>

          <Col>
            <div className="d-flex align-items-center">
              <div>
                <strong>{getLessonCountForStudent(student.id)}</strong> /{' '}
                {student.number_of_lessons_in_subscription}
              </div>
            </div>
          </Col>

          <Col>
            <div>
              <Button
                variant="outline-secondary"
                onClick={() => handleStudentLessonsClick(student)}
              >
                View Lessons
              </Button>
            </div>
          </Col>
          <Col>
            <div>
              <Button
                variant="outline-primary"
                onClick={() => handleReminderClick(student)}
              >
                Send Reminder
              </Button>
            </div>
          </Col>
          <Col>
            <div>
              <Button
                variant="outline-danger"
                onClick={() => handleDeleteClick(student)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default GetAllStudents;
