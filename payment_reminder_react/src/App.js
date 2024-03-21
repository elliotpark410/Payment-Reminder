import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { host } from './lib/constants';

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${host}/student/`);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePlusClick = (index) => {
    // Implement logic for increasing lesson number
    console.log('Plus clicked for student', index);
  };

  const handleMinusClick = (index) => {
    // Implement logic for decreasing lesson number
    console.log('Minus clicked for student', index);
  };

  const handleLessonNumberChange = (index) => {
    // Implement logic for decreasing lesson number
    console.log('Lesson number change clicked for student', index);
  };

  const handleHistoryClick = (student) => {
    // Implement logic for viewing history
    console.log('Viewing history for student', student);
  };

  const handleReminderClick = (student) => {
    // Implement logic for sending reminder
    console.log('Sending reminder for student', student);
  };

  const handleEditClick = (student) => {
    // Implement logic for editing student info
    console.log('Editing student info for student', student);
  };

  const handleAllLessons = async () => {
    // Implement logic for viewing all lessons
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col className="text-center">
          <h1>Payment Reminder</h1>
        </Col>
        <Col className="text-left">
          <Button variant="primary">Add Student</Button>
        </Col>
        <Col className="text-left">
          <Button variant="secondary" onClick={handleAllLessons}>
            All Lessons
          </Button>
        </Col>
      </Row>
      {students.map((student, index) => (
        <Row className="mt-3" key={student.id}>
          <Col>
            <div>
              <Button
                variant="outline-info"
                onClick={() => handleEditClick(student)}
              >
                Edit
              </Button>
            </div>
          </Col>
          <Col>
            <div>
              <p>Student: {student.student_name}</p>
              <p className="ml-3">Parent: {student.parent_name}</p>
            </div>
          </Col>
          <Col>
            <div className="d-flex align-items-center">
              <Button
                variant="outline-secondary"
                onClick={() => handleMinusClick(index)}
              >
                -
              </Button>

              <input
                type="text"
                className="form-control"
                style={{ width: '40px', margin: '0 10px' }}
                value={student.lessonNumber}
                onChange={(e) =>
                  handleLessonNumberChange(e.target.value, index)
                }
              />
              <Button
                variant="outline-secondary"
                onClick={() => handlePlusClick(index)}
              >
                +
              </Button>
            </div>
          </Col>

          <Col>
            <div>
              <Button
                variant="outline-primary"
                onClick={() => handleHistoryClick(student)}
              >
                View History
              </Button>
            </div>
          </Col>
          <Col>
            <div>
              <Button
                variant="outline-danger"
                onClick={() => handleReminderClick(student)}
              >
                Send Reminder
              </Button>
            </div>
          </Col>
        </Row>
      ))}
    </Container>
  );
}

export default App;
