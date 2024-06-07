import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Modal, Button, Pagination } from 'react-bootstrap';
import { host } from '../../lib/constants';
import DeleteLesson from './DeleteLesson';
import DeleteReset from './DeleteReset';
import DeletePayment from '../Payment/DeletePayment';
import EditPayment from '../Payment/EditPayment';
import EditLesson from './EditLesson';
import EditReset from './EditReset';
import SentText from '../Text/SentText';
import { formatDate, getTotalPaymentAmount } from '../../lib/util';
import '../../App.css';

export const fetchStudentLessons = async (studentId) => {
  try {
    const response = await axios.get(`${host}/lesson/student/${studentId}`);

    // Filter out records with null or invalid date
    const validLessons = response.data.filter((lesson) => {
      return lesson.date !== null && lesson.date !== undefined;
    });

    // Sort the valid records by date
    const sortedLessons = validLessons.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    // Format the sorted lessons
    const formattedLessons = sortedLessons.map((lesson, index) => ({
      ...lesson,
      lesson: true,
      lessonNumber: index + 1,
      formattedDate: formatDate(lesson.date)
    }));

    return formattedLessons;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw error;
  }
};

export const fetchStudentResets = async (studentId) => {
  try {
    // Fetch data from the API
    const response = await axios.get(`${host}/reset/student/${studentId}`);

    // Filter out records with null or undefined reset date
    const validResets = response.data.filter(
      (reset) => reset.date !== null && reset.date !== undefined
    );

    // Sort the valid records by reset date
    const sortedResets = validResets.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    // Format the sorted lessons
    const formattedResets = sortedResets.map((resetLesson) => ({
      ...resetLesson,
      resetLesson: true,
      formattedDate: formatDate(resetLesson.date)
    }));

    return formattedResets;
  } catch (error) {
    console.error('Error fetching reset lessons:', error);
    throw error;
  }
};

export const fetchStudentPayments = async (studentId) => {
  try {
    // Fetch data from the API
    const response = await axios.get(`${host}/payment/student/${studentId}`);

    // Filter out records with null or undefined dates
    const validPayments = response.data.filter(
      (payment) => payment.created_at !== null && payment.created_at !== undefined
    );

    // Format the valid payments and sort them
    const formattedPayments = validPayments.map((payment) => ({
      ...payment,
      payment: true,
      formattedDate: formatDate(payment.date)
    }));

    return formattedPayments;
  } catch (error) {
    console.error('Error fetching payments:', error);
    throw error;
  }
};

export const fetchStudentTexts = async (studentId) => {
  try {
    // Fetch data from the API
    const response = await axios.get(`${host}/text/student/${studentId}`);

    // Filter out records with null or undefined dates
    const validTexts = response.data.filter(
      (text) => text.date !== null && text.date !== undefined
    );

    // Format the valid texts and sort them
    const formattedTexts = validTexts.map((text) => ({
      ...text,
      text: true,
      formattedDate: formatDate(text.date)
    }));

    return formattedTexts
  } catch (error) {
    console.error('Error fetching texts:', error);
    throw error;
  }
};

function GetStudentLesson({ studentId, studentName, onClose }) {
  const [lessons, setLessons] = useState([]);
  const [resets, setResets] = useState([]);
  const [texts, setTexts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [showEditLessonModal, setShowEditLessonModal] = useState(false);
  const [showEditResetModal, setShowEditResetModal] = useState(false);
  const [showEditPaymentModal, setShowEditPaymentModal] = useState(false);
  const [editLesson, setEditLesson] = useState(null);
  const [editReset, setEditReset] = useState(null);
  const [lessonDate, setLessonDate] = useState('');
  const [resetDate, setResetDate] = useState('');
  const [editPayment, setEditPayment] = useState(null);
  const [paymentDate, setPaymentDate] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(null);
  const [showTextModal, setShowTextModal] = useState(false);
  const [textMessage, setTextMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const fetchData = useCallback(async () => {
    const fetchedLessons = await fetchStudentLessons(studentId);
    const fetchedResets = await fetchStudentResets(studentId);
    const fetchedPayments = await fetchStudentPayments(studentId);
    const fetchedTexts = await fetchStudentTexts(studentId);

    const mergedRecords = [...fetchedLessons, ...fetchedResets, ...fetchedPayments, ...fetchedTexts];
    const recordsWithLessonNumbers = assignLessonNumbers(mergedRecords);
    const totalPages = Math.ceil(recordsWithLessonNumbers.length / itemsPerPage);

    setLessons(fetchedLessons);
    setResets(fetchedResets);
    setPayments(fetchedPayments);
    setTexts(fetchedTexts);
    setCurrentPage(totalPages);
  }, [studentId]);

  useEffect(() => {
    fetchData();
  }, [fetchData, studentId]);

  const handleEditLesson = (lesson) => {
    setEditLesson(lesson);
    setLessonDate(new Date(lesson.date).toISOString().slice(0, 10));
    setShowEditLessonModal(true);
  };

  const handleEditReset = (reset) => {
    setEditReset(reset);
    setResetDate(new Date(reset.date).toISOString().slice(0, 10));
    setShowEditResetModal(true);
  };

  const handleEditPayment = (payment) => {
    setEditPayment(payment);
    setPaymentDate(new Date(payment.date).toISOString().slice(0, 10));
    setPaymentAmount(payment.amount);
    setShowEditPaymentModal(true);
  };

  const handleDelete = (itemId, setState) => {
    setState(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== itemId);
      return updatedItems;
    });
  };

  const handleDeleteLesson = lessonId => {
    handleDelete(lessonId, setLessons);
  };

  const handleDeleteResets = resetLessonId => {
    handleDelete(resetLessonId, setResets);
  };

  const handleDeletePayment = paymentId => {
    handleDelete(paymentId, setPayments);
  };

  const handleTextClick = (message) => {
    setTextMessage(message);
    setShowTextModal(true);
  }

  const mergedRecords = [...lessons, ...resets, ...payments, ...texts].sort((a, b) => new Date(a.formattedDate) - new Date(b.formattedDate));

  // Function to reset lesson numbers after each text or reset record
  const assignLessonNumbers = (records) => {
    let currentLessonNumber = 0; // Start lesson counter

    return records.map((record) => {
      if (record.lesson) {
        currentLessonNumber += 1; // Increment for each lesson
        return { ...record, lessonNumber: currentLessonNumber }; // Assign the updated lesson number
      } else if (record.text || record.resetLesson) {
         // Reset counter if a "text" or "reset lesson" is encountered
         currentLessonNumber = 0;
         return record; // Just return the record
      } else {
        // Skip for payment records
        return record

      }
    });
  };

  const recordsWithLessonNumbers = assignLessonNumbers(mergedRecords);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecords = recordsWithLessonNumbers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(recordsWithLessonNumbers.length / itemsPerPage);

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
      show={true}
      onHide={onClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {studentName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table">
          <thead>
            <tr>
              <th>Number</th>
              <th>Date</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((record, index) => {
              const uniqueKey = `${record.id}-${index}`;
              // lesson records
              if (record.lesson) {
                return (
                  <tr key={uniqueKey}>
                    <td>{record.lessonNumber}</td>
                    <td className="lesson-data" onClick={() => handleEditLesson(record)}>{record.formattedDate}</td>
                    <td>
                      <DeleteLesson
                        lessonId={record.id}
                        onDelete={() => handleDeleteLesson(record.id)}
                      />
                    </td>
                  </tr>
                );
                // text message records
              } else if (record.text) {
                return (
                  <tr key={uniqueKey}>
                    <td
                      colSpan="2"
                      onClick={() => handleTextClick(record.message)}
                      className="text-data text-center"
                      style={{
                        backgroundColor: '#007bff', // blue
                        color: 'white',
                        padding: '8px 15px',
                        borderRadius: '4px',
                        height: '55px',
                      }}
                      >
                        Message sent on {record.formattedDate}
                    </td>
                    <td colSpan="1"></td>
                  </tr>
                );
              } else if (record.payment) {
                // payment records
                return (
                  <tr key={uniqueKey}>
                    <td
                      colSpan="2"
                      className="payment-data text-center"
                      style={{
                      backgroundColor: '#74db79', // green
                      padding: '8px 15px',
                      borderRadius: '4px',
                      }}
                      onClick={() => handleEditPayment(record)}
                    >
                      ${record.amount.toLocaleString()} received on {record.formattedDate}
                    </td>
                    <td>
                      <DeletePayment
                        paymentId={record.id}
                        onDelete={() => handleDeletePayment(record.id)}
                      />
                    </td>
                  </tr>
                )
              }
               else {
                // lesson reset records
                return (
                  <tr key={uniqueKey}>
                    <td
                      colSpan="2"
                      className="reset-data text-center"
                      style={{
                      backgroundColor: '#FFC107', // yellow
                      padding: '8px 15px',
                      borderRadius: '4px',
                      }}
                      onClick={() => handleEditReset(record)}
                    >
                      Lesson reset on {record.formattedDate}
                    </td>
                    <td>
                      <DeleteReset
                        resetId={record.id}
                        onDelete={() => handleDeleteResets(record.id)}
                      />
                    </td>
                  </tr>
                );
              }
            })}
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
        Lessons Completed: <span className="lesson-payment-text">{lessons.length.toLocaleString()}</span>
        <br />
        Payments Received: <span className="lesson-payment-text">{getTotalPaymentAmount(payments)}</span>
      </div>
        <Button
          className="button"
          variant="secondary"
          onClick={onClose}
        >
          Close
        </Button>
      </Modal.Footer>

      {/* Edit Lesson Modal */}
      <EditLesson
        show={showEditLessonModal}
        onHide={() => setShowEditLessonModal(false)}
        lesson={editLesson}
        lessonDate={lessonDate}
        setLessonDate={setLessonDate}
        setEditLesson={setEditLesson}
        studentId={studentId}
        fetchData={fetchData}
      />

      {/* Edit Reset Modal */}
      <EditReset
        show={showEditResetModal}
        onHide={() => setShowEditResetModal(false)}
        reset={editReset}
        resetDate={resetDate}
        setResetDate={setResetDate}
        setEditLesson={setEditLesson}
        studentId={studentId}
        fetchData={fetchData}
      />

      {/* Edit Payment Modal */}
      <EditPayment
        show={showEditPaymentModal}
        onHide={() => setShowEditPaymentModal(false)}
        payment={editPayment}
        paymentDate={paymentDate}
        paymentAmount={paymentAmount}
        setPaymentDate={setPaymentDate}
        setPaymentAmount={setPaymentAmount}
        setEditPayment={setEditPayment}
        studentId={studentId}
        fetchData={fetchData}
      />

      {/* Display Sent Text Modal */}
      <SentText
        show={showTextModal}
        onHide={() => setShowTextModal(false)}
        textMessage={textMessage}
      />
    </Modal>
  );
}

export default GetStudentLesson;
