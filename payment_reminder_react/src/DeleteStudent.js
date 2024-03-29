import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { host } from './lib/constants';

const DeleteStudent = ({ student, onCancel, onDelete }) => {
  const handleDelete = async () => {
    try {
      console.log('Deleting student:', student);
      await axios.delete(`${host}/student/${student.id}`);
      console.log(`Student deleted successfully`);
      onDelete(student.id); // Inform the parent component about the deletion
    } catch (error) {
      console.error('Error deleting student:', error);
      // Handle error here, if necessary
    }
  };

  return (
    <Modal show={true} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete {student.student_name}?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteStudent;
