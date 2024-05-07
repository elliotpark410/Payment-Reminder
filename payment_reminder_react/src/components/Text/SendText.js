// SendText.js
import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { host } from '../../lib/constants';

const SendText = ({ studentId, studentName, studentLessonCount, studentSusbscriptionCount, studentFilteredLessonDates, studentSubscriptionAmount, onClose }) => {
  const fullName = studentName.split(' ');
  const firstName = fullName[0];
  const lessonCount = studentLessonCount;
  const lessonsInSubscription = studentSusbscriptionCount;
  const formattedSubscriptionAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0, // No cents
    maximumFractionDigits: 0,
  }).format(studentSubscriptionAmount);
  const formattedLessonDates = studentFilteredLessonDates
  .sort((a, b) => new Date(a) - new Date(b))
  .map((date) =>
    new Date(date).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    })
  )
  .join('\n');

  const defaultMessage = `Hi ${firstName},
  \nThis is a gentle reminder that you have completed ${lessonCount} / ${lessonsInSubscription} lessons with Park Vocal Studio.
  \nLesson dates:\n${formattedLessonDates}
  \nPlease renew your subscription payment of ${formattedSubscriptionAmount}`;

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
