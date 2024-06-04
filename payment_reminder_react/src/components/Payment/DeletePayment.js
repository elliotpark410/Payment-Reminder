import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { host } from '../../lib/constants';

const DeletePayment= ({ paymentId, onDelete }) => {
  const handleDeletePayment = async () => {
    try {
      await axios.delete(`${host}/payment/delete/${paymentId}`);
      console.log(`Payment with ID ${paymentId} deleted successfully`);

      onDelete();
    } catch (error) {
      console.error('Error deleting payment:', error);
      throw error;
    }
  };

  return (
    <Button
      variant="outline-danger"
      onClick={handleDeletePayment}
      title="Delete payment"
    >
      <FontAwesomeIcon icon={faTrash} />
    </Button>
  );
};

export default DeletePayment;
