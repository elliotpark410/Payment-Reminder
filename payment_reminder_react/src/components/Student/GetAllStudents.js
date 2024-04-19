import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const GetAllStudents = ({
  students,
  onEditStudentClick,
  onDeleteStudentClick,
  onStudentLessonsClick,
  getLessonCountForStudent,
  onAddLessonClick,
  onSendTextClick
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
              onClick={() => onEditStudentClick(student)}
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
                onClick={() => onAddLessonClick(student)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </div>
          </Col>

          <Col>
            <div className="d-flex align-items-center">
            <div>
                {getLessonCountForStudent(student.id) >= student.number_of_lessons_in_subscription - 1 ? (
                  <strong>
                    <span
                      style={{
                        color: '#007bff', // Blue color when condition is met
                      }}
                    >
                      {getLessonCountForStudent(student.id)}
                    </span>
                  </strong>
                ) : (
                  <span>
                    {getLessonCountForStudent(student.id)}
                  </span>
                )}
                {' '}
                / {student.number_of_lessons_in_subscription}
              </div>
            </div>
          </Col>

          <Col>
            <div>
              <Button
                variant="outline-success"
                onClick={() => onStudentLessonsClick(student)}
              >
                View Lessons
              </Button>
            </div>
          </Col>
          <Col>
            <div>
              <Button
                variant={getLessonCountForStudent(student.id) < student.number_of_lessons_in_subscription - 1 ? 'outline-secondary' : 'outline-primary'}
                onClick={() => onSendTextClick(student)}
                disabled={getLessonCountForStudent(student.id) < student.number_of_lessons_in_subscription - 1}
              >
                Send Text
              </Button>
            </div>
          </Col>
          <Col>
            <div>
              <Button
                variant="outline-danger"
                onClick={() => onDeleteStudentClick(student)}
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
