import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSlash } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

const Footer = ({ onInactiveStudentsClick }) => {
  return (
    <Row className="footer mt-4 d-flex justify-content-center">
      <Col xs="auto" className="text-center">
        <Button
          className="big-button"
          variant="warning"
          onClick={onInactiveStudentsClick}
          title="Inactive Students"
        >
          <FontAwesomeIcon icon={faUserSlash} style={{ marginRight: '0.5em' }} />
          Inactive Students
        </Button>
      </Col>
    </Row>
  );
};

export default Footer;
