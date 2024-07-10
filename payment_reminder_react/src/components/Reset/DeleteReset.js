import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { api } from '../../lib/constants';

const DeleteReset = ({ resetId, onDelete }) => {
  const handleDeleteReset = async () => {
    try {
      await api.delete(`/reset/delete/${resetId}`);
      // console.log(`Reset with ID ${resetId} deleted successfully`);

      onDelete();
    } catch (error) {
      console.error('Error deleting reset:', error);
      throw error;
    }
  };

  return (
    <Button variant="outline-danger" onClick={handleDeleteReset} title="Delete reset">
      <FontAwesomeIcon icon={faTrash} />
    </Button>
  );
};

export default DeleteReset;
