import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { host } from '../../lib/constants';

const DeleteReset = ({ resetId, onDelete }) => {
  const handleDeleteReset = async () => {
    try {
      await axios.delete(`${host}/reset/delete/${resetId}`);
      console.log(`Reset with ID ${resetId} deleted successfully`);

      onDelete();
    } catch (error) {
      console.error('Error deleting reset:', error);
      throw error;
    }
  };

  return (
    <Button
      variant="outline-danger"
      onClick={handleDeleteReset}
      title="Delete reset"
    >
      <FontAwesomeIcon icon={faTrash} />
    </Button>
  );
};

export default DeleteReset;
