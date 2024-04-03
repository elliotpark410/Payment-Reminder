import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import SendText from '../Text/SendText';

const GetAllStudents = ({
  students,
  handleEditStudentClick,
  handleDeleteStudentClick,
  handleStudentLessonsClick,
  getLessonCountForStudent,
  handleAddLesson,
}) => {
  const [showSendTextModal, setShowSendTextModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);


  const handleSendTextClick = (student) => {
    setShowSendTextModal(true); // Show SendText modal
    setSelectedStudentId(student.id);
  };

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
              onClick={() => handleEditStudentClick(student)}
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
                onClick={() => handleSendTextClick(student)}
              >
                Send Text
              </Button>
            </div>
          </Col>
          <Col>
            <div>
              <Button
                variant="outline-danger"
                onClick={() => handleDeleteStudentClick(student)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          </Col>
        </Row>
      ))}
      {showSendTextModal && (
        <SendText
        studentId={selectedStudentId}
        onClose={() => setShowSendTextModal(false)} />
      )}
    </>
  );
};

export default GetAllStudents;
