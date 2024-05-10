import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

const Header = ({ onAddStudentClick, onAllLessonsClick }) => {
  const headerStyle = {
    fontSize: '3.0rem', // Large font size
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Subtle shadow for depth
    transition: 'transform 0.3s ease', // Smooth transition for hover effect
    cursor: 'pointer'
  };

  const website = "https://parkvocalstudio.com/";

  const openWebsite = () => {
    window.open(website, "_blank"); // Open in a new tab
  };

  return (
    <Row className="mt-4 d-flex align-items-center">
      <Col xs={6} className="text-left">
        <h1
          className="mb-4"
          style={headerStyle}
          onClick={openWebsite}
          title={website}
        >
            Park Vocal Studio
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
