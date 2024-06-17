import React from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { host } from '../../lib/constants';
import { toast } from 'react-toastify';
import { formatDate } from '../../lib/util';
import 'react-toastify/dist/ReactToastify.css';
import '../../App.css';

const EditPayment = ({
  show,
  onHide,
  payment,
  paymentDate,
  paymentAmount,
  setPaymentDate,
  setPaymentAmount,
  setEditPayment,
  fetchStudentPaymentData
}) => {
  const handleSaveEdit = async () => {
    try {
      // Validate date
      const date = new Date(paymentDate);
      const isValidDate = date instanceof Date && !isNaN(date);

      if (!paymentDate || !isValidDate) {
        toast.error('Please enter a valid date.');
        return;
      }

      const isValidAmount = /^[1-9]\d*(\.\d+)?$/.test(paymentAmount);

      if (!isValidAmount) {
        toast.error('Please enter a valid amount.');
        return;
      }

      const response = await axios.put(`${host}/payment/${payment.id}`, {
        date: paymentDate,
        amount: paymentAmount
      });

      // console.log('Payment updated successfully:', response.data);

      onHide();

      const notificationDate = formatDate(response.data.date);

      if (response.status === 200 || 201) {
        // Show notifcation
        toast.success(`Edited payment ${notificationDate} `, {
          position: "top-left",
          autoClose: 3000 // Close after 3 seconds
        });
      } else {
        console.error('Error editing payment. Unexpected response:', response);
      }

      setEditPayment(null);
      setPaymentDate('');
      setPaymentAmount(null);
      fetchStudentPaymentData();
    } catch (error) {
      console.error('Error updating payment:', error);
      throw error;
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="paymentDate">
          <Form.Label>Payment Date</Form.Label>
          <Form.Control
            type="date"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group controlId="paymentAmount">
          <Form.Label>Amount</Form.Label>
          <div style={{ position: 'relative' }}>
            <span
              style={{
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
                fontSize: '18px'
              }}
            >
              $
            </span>
            <Form.Control
              type="number"
              value={paymentAmount ?? ''}
              onChange={(e) => setPaymentAmount(e.target.value)}
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                paddingLeft: '30px'
              }}
            />
          </div>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button className="small-button" variant="primary" onClick={handleSaveEdit}>
          Save
        </Button>
        <Button className="small-button" variant="secondary" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPayment;
