import React from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { host } from '../../lib/constants';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../App.css';

const EditPayment = ({ show, onHide, payment, paymentDate, paymentAmount, setPaymentDate, setPaymentAmount, setEditPayment, studentId, fetchStudentPayments, fetchStudentLessons, fetchStudentTexts, setLessons, setPayments, setTexts }) => {

  const handleSaveEdit = async () => {
    try {
      const isValidAmount = /^[1-9]\d*(\.\d+)?$/.test(paymentAmount);

      if (!isValidAmount) {
        toast.error('Please enter a valid amount.');
        return;
      }

      const response = await axios.put(`${host}/payment/${payment.id}`, {
        payment_date: paymentDate,
        amount: paymentAmount
       });

      console.log('Payment updated successfully:', response.data);

      onHide();
      setEditPayment(null);
      setPaymentDate('');
      setPaymentAmount(null);
      fetchStudentLessons(studentId, setLessons);
      fetchStudentPayments(studentId, setPayments);
      fetchStudentTexts(studentId, setTexts);
    } catch (error) {
      console.error('Error updating payment:', error);
      throw error;
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
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
          <Form.Control
            type="number"
            value={paymentAmount ?? ''}
            onChange={(e) => setPaymentAmount(e.target.value)}
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
            }}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="smallButton"
          variant="primary"
          onClick={handleSaveEdit}
        >
          Save
        </Button>
        <Button
          className="smallButton"
          variant="secondary"
          onClick={onHide}
          >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPayment;
