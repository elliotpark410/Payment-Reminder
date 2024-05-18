import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../App.css';


function ResetLesson({ onClose, resetDate }) {
  return (
    <Modal
      size="md"
      show={true}
      onHide={onClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Lesson reset on {resetDate}
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button
          className="button"
          variant="secondary"
          onClick={onClose}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ResetLesson;
