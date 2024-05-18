import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { host } from '../../lib/constants';

const DeleteLesson = ({ lessonId, onDelete }) => {
  const handleDeleteLesson = async () => {
    try {
      await axios.put(`${host}/lesson/delete/${lessonId}`);
      console.log(`Lesson with ID ${lessonId} deleted successfully`);
      onDelete();
    } catch (error) {
      console.error('Error deleting lesson:', error);
      throw error;
    }
  };

  return (
    <Button
      variant="outline-danger"
      onClick={handleDeleteLesson}
      title="Delete lesson"
    >
      <FontAwesomeIcon icon={faTrash} />
    </Button>
  );
};

export default DeleteLesson;
