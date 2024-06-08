// SendText.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { host } from '../../lib/constants';
import { todaysDate } from '../../lib/util';
import '../../App.css';

const SendText = ({
  studentId,
  studentName,
  parentName,
  studentLessonCount,
  studentSusbscriptionCount,
  studentFilteredLessonDates,
  studentSubscriptionAmount,
  onClose
}) => {
  const name = parentName || studentName;

  const fullName = name.split(' ');

  const firstName = fullName[0];

  const lessonCount = studentLessonCount;

  const lessonsInSubscription = studentSusbscriptionCount;

  const formattedSubscriptionAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0, // No cents
    maximumFractionDigits: 0
  }).format(studentSubscriptionAmount);

  const formattedLessonDates = studentFilteredLessonDates
    .sort((a, b) => new Date(a) - new Date(b))
    .map((date) =>
      new Date(date).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      })
    )
    .join('\n');

  const defaultMessage = `Hi ${firstName},
  \nThis is a gentle reminder that you have completed ${lessonCount} / ${lessonsInSubscription} lessons with Park Vocal Studio.
  \nLesson dates:\n${formattedLessonDates}
  \nPlease renew your subscription payment of ${formattedSubscriptionAmount}`;

  const [message, setMessage] = useState(defaultMessage);
  const [error, setError] = useState('');

  const extractErrorMessage = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    const preElement = doc.querySelector('pre');
    if (preElement) {
      const errorText = preElement.innerHTML || '';
      const errorMessage = errorText.split('<br>')[0].replace('Error: ', '').trim();
      return errorMessage + ". Please hit the reset button to reset lesson count.";
    }
    return "An error occurred";
  };

  const handleSendText = async () => {
    try {
      const response = await axios.post(`${host}/text/send`, {
        student_id: studentId,
        message
      });
      console.log('Text message sent successfully');
      onClose(); // Close the modal after sending the text message

      if (response.status === 200 || 201) {
        const today = todaysDate();

        // Show notifcation
        toast.info(`Message sent on ${today}`, {
          autoClose: 3000 // Close after 3 seconds
        });
      } else {
        console.error('Error sending text message. Unexpected response: ', response);
        toast.error('Unexpected response from the server. Please try again later.');
        setError('Unexpected response from the server. Please try again later.');
      }
    } catch (error) {
      let errorMessage = 'Failed to send text message. Please try again later.';
      if (error.response && error.response.data) {
        errorMessage = extractErrorMessage(error.response.data);
      }
      console.error('Error sending text message: ', error.response.data);
      toast.error('Failed to send text message. Please try again later.');
      setError(errorMessage);
      return;
    }
  };

  // Calculate the number of lines in the text
  const lineCount = message.split('\n').length + 2;

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Send Text Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group controlId="textMessage">
          <Form.Control
            as="textarea"
            rows={lineCount > 3 ? lineCount : 3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button className="button" variant="primary" onClick={handleSendText}>
          Send
        </Button>
        <Button className="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SendText;
