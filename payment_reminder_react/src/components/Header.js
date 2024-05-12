import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faThList } from '@fortawesome/free-solid-svg-icons';
import musicNotesIcon from '../images/musicNotes.png';


const Header = ({ onAddStudentClick, onAllLessonsClick }) => {
  const headerStyle = {
    fontSize: '3.0rem', // Large font size
    fontWeight: 'bold',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', // Subtle shadow for depth
    transition: 'transform 0.3s ease', // Smooth transition for hover effect
    display: 'flex',
  };

  const iconStyle = {
    height: '3.0rem', // Set height to match font size of the header
    marginLeft: '10px', // Add some space between the header text and the icon
  };

  return (
    <Row className="mt-4 d-flex align-items-center">
      <Col xs={6} className="text-left">
        <h1
          className="mb-4"
          style={headerStyle}
        >
            Park Vocal Studio
            <img src={musicNotesIcon} alt="musical note icon" style={iconStyle} />
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
