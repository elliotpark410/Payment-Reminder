import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Pagination } from 'react-bootstrap';
import { host } from '../../lib/constants';
import { formatDate, getTotalPaymentAmount } from '../../lib/util';
import '../../App.css';

const fetchLessons = async (setLessons) => {
  try {
    const response = await axios.get(`${host}/lesson/`);

    // Filter out records with null or invalid date
    const validLessons = response.data.filter((lesson) => {
      return (
        lesson.date !== null &&
        lesson.date !== undefined
      );
    });

    const sortedLessons = validLessons.sort((a, b) => new Date(a.date) - new Date(b.date));

    const formattedLessons = sortedLessons.map((lesson, index) => ({
      ...lesson,
      lessonNumber: index + 1,
      formattedDate: formatDate(lesson.date)

    }));

    setLessons(formattedLessons);
  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw error;
  }
};

const fetchPayments = async (setPayments) => {
  try {
    const response = await axios.get(`${host}/payment/`);

    // Filter out invalid records
    const validPayments = response.data.filter((payment) => {
      return (
        payment.amount !== null &&
        payment.amount !== undefined &&
        payment.amount !== 0 &&
        payment.date !== null &&
        payment.date !== undefined
      );
    });

    setPayments(validPayments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    throw error;
  }
};

function GetAllLessons({ onClose }) {
  const [lessons, setLessons] = useState([]);
  const [payments, setPayments] = useState([]);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;


  useEffect(() => {
    fetchLessons(setLessons);
    fetchPayments(setPayments);
  }, []);

  useEffect(() => {
    if (lessons.length > 0) {
      const totalPages = Math.ceil(lessons.length / itemsPerPage);
      setCurrentPage(totalPages);
    }
  }, [lessons]);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentRecords = lessons.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(lessons.length / itemsPerPage);

    const renderPaginationItems = () => {
      const pageNumbers = [];

      let startPage = currentPage - 5;
      let endPage = currentPage + 4;

      if (startPage < 1) {
        startPage = 1;
        endPage = Math.min(10, totalPages);
      }

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, totalPages - 9);
      }

      for (let number = startPage; number <= endPage; number++) {
        pageNumbers.push(
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </Pagination.Item>
        );
      }

      return pageNumbers;
    };

  return (
    <Modal
      size="lg"
      show
      onHide={onClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          All Lessons
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table">
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Date</th>

            </tr>
          </thead>
          <tbody>
            {currentRecords.map((lesson) => (
              <tr key={lesson.id}>
                <td>{lesson.lessonNumber}</td>
                <td>{lesson.student_name}</td>
                <td>{lesson.formattedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
          <div className="pagination-container">
            <Pagination className="pagination">
              <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
              <Pagination.Prev onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
              {renderPaginationItems()}
              <Pagination.Next onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
              <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
            </Pagination>
          </div>
      </Modal.Body>
      <Modal.Footer>
        <div style={{ flex: 1, textAlign: 'left', fontSize: '16px' }}>
          Total Lessons: <span className="lesson-payment-text">{lessons.length.toLocaleString()}</span>
        <br />
          Total Payment: <span className="lesson-payment-text">{getTotalPaymentAmount(payments)}</span>
        </div>
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

export default GetAllLessons;
