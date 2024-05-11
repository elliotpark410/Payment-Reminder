import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faThList } from '@fortawesome/free-solid-svg-icons';

const Header = ({ onAddStudentClick, onAllLessonsClick }) => {
  const headerStyle = {
    fontSize: '3.0rem', // Large font size
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Subtle shadow for depth
    transition: 'transform 0.3s ease', // Smooth transition for hover effect
  };

  return (
    <Row className="mt-4 d-flex align-items-center">
      <Col xs={6} className="text-left">
        <h1
          className="mb-4"
          style={headerStyle}
        >
            Park Vocal Studio
        </h1>
      </Col>
      <Col xs={2} />
      <Col xs={2} className="text-right">
        <Button
          style={{ width: '180px' }}
          variant="primary"
          onClick={onAddStudentClick}
          title="Add Student"
        >
          <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: '0.5em' }} />
          Add Student
        </Button>
      </Col>
      <Col xs={2} className="text-right">
        <Button
          style={{ width: '180px' }}
          variant="success"
          onClick={onAllLessonsClick}
          title="All Lessons"
        >
          <FontAwesomeIcon icon={faThList} style={{ marginRight: '0.5em' }} />
          All Lessons
        </Button>
      </Col>
    </Row>
  );
};

export default Header;
