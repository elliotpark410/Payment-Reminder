import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { host } from '../../lib/constants';
import '../../App.css';

const EditLesson = ({ show, onHide, lesson, lessonDate, setLessonDate, setEditLesson, fetchData }) => {

  const handleSaveEdit = async () => {
    try {
      // Validate date
      const date = new Date(lessonDate);
      const isValidDate = date instanceof Date && !isNaN(date);

      if (!lessonDate || !isValidDate) {
        toast.error('Please enter a valid date.');
        return;
      }

      const response = await axios.put(`${host}/lesson/${lesson.id}`, { date: lessonDate });
      console.log('Lesson updated successfully:', response.data);
      onHide();

      if (response.status === 200 || 201) {
        // Show notifcation
        toast.success(`Edited lesson`, {
          autoClose: 3000, // Close after 3 seconds
        });
      } else {
        console.error('Error editing lesson. Unexpected response:', response);
      };

      setEditLesson(null);
      setLessonDate('');
      fetchData();
    } catch (error) {
      console.error('Error updating lesson:', error);
      throw error;
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Lesson</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="lessonDate">
          <Form.Label>Lesson Date</Form.Label>
          <Form.Control
            type="date"
            value={lessonDate}
            onChange={(e) => setLessonDate(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="smallButton"
          variant="primary"
          onClick={handleSaveEdit}
        >
          Save
        </Button>
        <Button
          className="smallButton"
          variant="secondary"
          onClick={onHide}
          >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditLesson;
