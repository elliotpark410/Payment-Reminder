import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faThList } from '@fortawesome/free-solid-svg-icons';
import musicNotesIcon from '../images/musicNotes.png';
import '../App.css';

const Header = ({ onAddStudentClick, onAllLessonsClick }) => {
  return (
    <Row className="mt-4 d-flex align-items-center">
      <Col xs={6} className="text-left">
        <h1
          className="header mb-4"
        >
            Park Vocal Studio
            <img
              src={musicNotesIcon}
              alt="musical note icon"
              className="icon"
            />
        </h1>
      </Col>
      <Col xs={2} />
      <Col xs={2} className="text-right">
        <Button
          className="bigButton"
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
          className="bigButton"
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
