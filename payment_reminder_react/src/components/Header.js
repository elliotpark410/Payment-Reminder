import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

const Header = ({ onAddStudentClick, onAllLessonsClick }) => {
  const website = "https://parkvocalstudio.com/";
  const openWebsite = () => {
    window.open(website, "_blank"); // Open in a new tab
  };

  return (
    <Row className="mt-4 d-flex align-items-center">
      <Col xs={6} className="text-left">
        <h1 className="mb-4">
            Park Vocal Studio
            <FontAwesomeIcon
              icon={faMusic}
              onClick={openWebsite}
              title={website}
              style={{ cursor: 'pointer', marginLeft: '10px' }}
            />
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
