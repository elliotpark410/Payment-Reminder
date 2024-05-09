import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

const Header = ({ onAddStudentClick, onAllLessonsClick }) => {
  const openWebsite = () => {
    window.open("https://parkvocalstudio.com/", "_blank"); // Open in a new tab
  };

  return (
    <Row className="mt-5 d-flex align-items-center">
      <Col xs={6} className="text-left">
        <h1 className="mb-4" onClick={openWebsite} title="https://parkvocalstudio.com" style={{ cursor: 'pointer' }}>
          Park Vocal Studio <FontAwesomeIcon icon={faMusic} />
        </h1>
      </Col>
      <Col xs={2} />
      <Col xs={2} className="text-right">
        <Button variant="primary" onClick={onAddStudentClick} title="Add Student">
          Add Student
        </Button>
      </Col>
      <Col xs={2} className="text-right">
        <Button variant="success" onClick={onAllLessonsClick} title="All Lessons">
          All Lessons
        </Button>
      </Col>
    </Row>
  );
};

export default Header;
