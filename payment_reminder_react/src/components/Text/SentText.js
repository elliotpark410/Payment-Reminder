// SentText.js
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const SentTextModal = ({ show, onHide, textMessage }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="textMessage">
          <Form.Control
            as="textarea"
            rows={Math.max(textMessage.split('\n').length + 1, 3)}
            value={textMessage}
            readOnly
            style={{
              border: 'none', // No border
              pointerEvents: 'none' // Disable pointer events
            }}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button className="button" variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SentTextModal;
