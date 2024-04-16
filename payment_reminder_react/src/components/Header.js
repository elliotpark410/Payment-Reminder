import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

const Header = ({ onAddStudentClick, onAllLessonsClick }) => {
  return (
    <Row className="mt-5">
      <Col className="text-center">
        <h1>Payment Reminder</h1>
      </Col>
      <Col className="text-left">
        <Button variant="primary" onClick={onAddStudentClick}>
          Add Student
        </Button>
      </Col>
      <Col className="text-left">
        <Button variant="success" onClick={onAllLessonsClick}>
          All Lessons
        </Button>
      </Col>
    </Row>
  );
};

export default Header;
