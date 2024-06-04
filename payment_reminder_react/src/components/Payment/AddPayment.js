// AddPayment.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { host } from '../../lib/constants';
import '../../App.css';

function AddPayment({ show, onClose, studentId, selectedDate, onUpdate }) {
  const [amount, setAmount] = useState('');
  const [isInputEmpty, setIsInputEmpty] = useState(true);

  // Function to handle add payment on the selected date
  const handleSave = async () => {
    try {
      // Check if the entered amount is a positive number
      const isValidAmount = /^[1-9]\d*(\.\d+)?$/.test(amount);
      if (!isValidAmount) {
        toast.error('Please enter a valid amount.');
        return;
      }

      const formattedDate = selectedDate.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });

      // Make API call to add payment using Axios
      const response = await axios.post(`${host}/payment/add`, {
        student_id: studentId,
        date: formattedDate,
        amount: amount
      });

      console.log('Added payment:', response.data);

      if (response.status === 200 || 201) {
        // Show notifcation
        toast.success(`Added payment`, {
          autoClose: 3000, // Close after 3 seconds
        });

        onUpdate();
      } else {
        console.error('Error adding payment. Unexpected response:', response);
      };

      onClose();
    } catch (error) {
      console.error('Error adding payment:', error);
      throw error
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setAmount(inputValue);
    setIsInputEmpty(inputValue === '');
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formPaymentAmount">
            <Form.Label>Amount</Form.Label>
            <div style={{ position: 'relative' }}>
              <span
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '10px',
                  transform: 'translateY(-50%)',
                  fontSize: '18px',
                }}
              >
                $
              </span>
              <Form.Control
                type="number"
                // placeholder="Enter amount"
                value={amount}
                onChange={handleInputChange}
                style={{
                  paddingLeft: '30px',
                  fontSize: isInputEmpty ? 'inherit' : '18px', // Change font size based on input content
                  fontWeight: isInputEmpty ? 'inherit' : 'bold', // Change font weight based on input content
                  '::placeholder': {
                    color: 'gray', // Placeholder color remains the same
                    fontStyle: 'italic', // Placeholder font style remains the same
                  },
                }}
              />
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="smallButton"
          variant="primary"
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          className="smallButton"
          variant="secondary"
          onClick={onClose}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddPayment;
