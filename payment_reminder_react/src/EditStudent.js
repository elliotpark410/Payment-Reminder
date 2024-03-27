import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function EditStudent({ student, onClose }) {
  const handleSave = () => {
    console.log('Saving edit for student', student);
    onClose();
  };

  return (
    <Modal
      size="lg"
      show
      onHide={onClose} // Use onClose function from props to close the modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Student
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="studentName">
            <Form.Label>Student Name</Form.Label>
            <Form.Control type="text" defaultValue={student.student_name} />
          </Form.Group>
          <Form.Group controlId="parentName">
            <Form.Label>Parent Name</Form.Label>
            <Form.Control type="text" defaultValue={student.parent_name} />
          </Form.Group>
          <Form.Group controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" defaultValue={student.phone_number} />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" defaultValue={student.email} />
          </Form.Group>
          <Form.Group controlId="subscriptionPrice">
            <Form.Label>Subscription Price</Form.Label>
            <Form.Control type="text" defaultValue={student.subscription_price} />
          </Form.Group>
          <Form.Group controlId="NumberOfLessonsInSubscription">
            <Form.Label>Number of Lessons in Subscription</Form.Label>
            <Form.Control type="text" defaultValue={student.number_of_lessons_in_subscription} />
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditStudent;
