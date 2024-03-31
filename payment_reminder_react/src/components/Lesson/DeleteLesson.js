import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { host } from '../../lib/constants';

function DeleteLesson({ lessonId, onClose, onDelete }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`${host}/lesson/${lessonId}`);
      onDelete(lessonId);
      onClose();
    } catch (error) {
      console.error('Error deleting lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Lesson</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this lesson?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          <FontAwesomeIcon icon={faTimes} className="mr-1" /> Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={loading}>
          {loading ? 'Deleting...' : 'Delete'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteLesson;
