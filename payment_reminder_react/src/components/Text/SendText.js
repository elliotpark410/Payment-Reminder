// SendText.js
import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { host } from '../../lib/constants';

const SendText = ({ studentId, studentName, onClose }) => {
  const fullName = studentName.split(' ');
  const firstName = fullName[0];
  const defaultMessage = `Hi ${firstName}, this is a reminder to renew your subscription`;
  const [message, setMessage] = useState(defaultMessage);

  const handleSendText = async () => {
    try {
      await axios.post(`${host}/text/send`, { student_id: studentId, message });
      console.log('Text message sent successfully');
      onClose(); // Close the modal after sending the text message
    } catch (error) {
      console.error('Error sending text message:', error);
      throw error;
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Send Text Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="textMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSendText}>
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SendText;
