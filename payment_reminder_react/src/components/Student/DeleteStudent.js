// DeleteStudent.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { host } from '../../lib/constants';
import '../../App.css';

const DeleteStudent = ({ student, onCancel, onDelete }) => {

  if (!student) {
    return null; // Do not render the modal if there's no valid student
  };

  const handleDelete = async () => {
    try {
      console.log('Deleting student:', student);
      await axios.delete(`${host}/student/${student.id}`);
      console.log(`Student deleted successfully`);
      onDelete(student.id); // Inform the parent component about the deletion
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
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
        <Button
          className="smallButton"
          variant="danger"
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button
          className="smallButton"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteStudent;
