import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Form, Button, InputGroup } from 'react-bootstrap';
import { api } from '../../lib/constants';
import '../../App.css';

function AddStudent({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    student_name: '',
    parent_name: '',
    phone_number: '',
    email: '',
    subscription_price: '',
    subscription_number: ''
  });

  const [duplicateNameError, setDuplicateNameError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validatePhoneNumber = (phoneNumber) => {
    const re = /^\+?[0-9()-]{10,15}$/; // Basic validation for phone number
    return re.test(phoneNumber);
  };

  const validatePositiveWholeNumber = (value) => {
    const re = /^[1-9]\d*$/;
    return re.test(value);
  };

  const formatPhoneNumber = (phoneNumber) => {
    // Remove all non-numeric characters
    const numericValue = phoneNumber.replace(/\D/g, '');
    // Apply phone number formatting
    const formattedNumber = numericValue.replace(/(\d{3})(\d{3})(\d{4})/, '($1)  $2 - $3');
    return formattedNumber;
  };

  const handleAddStudent = async () => {
    try {
      // Data validation
      if (!formData.student_name) {
        toast.error('Student name is required.');
        return;
      }

      if (!formData.phone_number) {
        toast.error('Phone number is required.');
        return;
      }

      if (!validatePhoneNumber(formData.phone_number)) {
        toast.error('Invalid phone number.');
        return;
      }

      if (
        formData.subscription_price &&
        !validatePositiveWholeNumber(formData.subscription_price)
      ) {
        toast.error('Subscription price must be a positive whole number.');
        return;
      }

      if (
        formData.subscription_number &&
        !validatePositiveWholeNumber(formData.subscription_number)
      ) {
        toast.error('Subscription number must be a positive whole number.');
        return;
      }

      // console.log('Adding new student:', formData);

      const response = await api.post(`/student/add`, formData);

      // console.log('Added student:', response.data);

      onAdd(response.data); // Pass the added student data to the parent component

      if (response.status === 200 || response.status === 201) {
        // Show notifcation
        toast.success(`Added ${formData.student_name}`, {
          position: 'top-left',
          autoClose: 3000 // Close after 3 seconds
        });
      } else {
        console.error('Error adding student. Unexpected response:', response);
      }

      onClose();
    } catch (error) {
      console.error('Error adding student:', error);

      // Disallow duplicate name
      if (error.response && error.response.status === 500) {
        if (error.response.data.includes('Duplicate entry')) {
          setDuplicateNameError(`${formData.student_name} already exists!`);
          return; // Prevent closing the modal
        }
      }

      throw error;
    }
  };

  return (
    <Modal size="lg" show onHide={onClose} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="studentName" className="pb-2">
            <Form.Label>
              Student Name <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="student_name"
              value={formData.student_name}
              onChange={handleInputChange}
              required
            />
            {duplicateNameError && (
              <Form.Text className="text-danger">{duplicateNameError}</Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="parentName" className="py-2">
            <Form.Label>Parent Name</Form.Label>
            <Form.Control
              type="text"
              name="parent_name"
              value={formData.parent_name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="phoneNumber" className="py-2">
            <Form.Label>
              Phone Number <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="phone_number"
              value={formatPhoneNumber(formData.phone_number)}
              onChange={handleInputChange}
              pattern="[0-9]*" // Only allow numbers
              maxLength="14"
              inputMode="numeric"
              required
            />
          </Form.Group>
          <Form.Group controlId="email" className="py-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="subscriptionPrice" className="py-2">
            <Form.Label>Subscription Price</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                type="text"
                name="subscription_price"
                value={formData.subscription_price}
                onChange={handleInputChange}
                pattern="[0-9]*" // Only allow numbers
                inputMode="numeric"
              />
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="NumberOfLessonsInSubscription" className="py-2">
            <Form.Label>Subscription Count</Form.Label>
            <Form.Control
              type="text"
              name="subscription_number"
              value={formData.subscription_number}
              onChange={handleInputChange}
              pattern="[0-9]*" // Only allow numbers
              inputMode="numeric"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="button" variant="primary" onClick={handleAddStudent}>
          Add
        </Button>
        <Button className="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddStudent;
