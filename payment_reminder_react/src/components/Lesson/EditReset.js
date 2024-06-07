import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { host } from '../../lib/constants';
import { formatDate } from '../../lib/util';
import '../../App.css';

const EditReset = ({ show, onHide, reset, resetDate, setResetDate, setEditLesson, fetchData }) => {

  const handleSaveEdit = async () => {
    try {
      // Validate date
      const date = new Date(resetDate);
      const isValidDate = date instanceof Date && !isNaN(date);

      if (!resetDate || !isValidDate) {
        toast.error('Please enter a valid date.');
        return;
      }

      const response = await axios.put(`${host}/reset/${reset.id}`, { date: resetDate });
      console.log('Reset updated successfully:', response.data);
      onHide();

      const notificationDate = formatDate(date);


      if (response.status === 200 || 201) {
        // Show notifcation
        toast.warning(`Edited reset ${notificationDate}`, {
          autoClose: 3000, // Close after 3 seconds
        });
      } else {
        console.error('Error editing reset. Unexpected response:', response);
      };

      setEditLesson(null);
      setResetDate('');
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
        <Modal.Title>Edit Reset</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="resetDate">
          <Form.Label>Reset Date</Form.Label>
          <Form.Control
            type="date"
            value={resetDate}
            onChange={(e) => setResetDate(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="small-button"
          variant="primary"
          onClick={handleSaveEdit}
        >
          Save
        </Button>
        <Button
          className="small-button"
          variant="secondary"
          onClick={onHide}
          >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditReset;
