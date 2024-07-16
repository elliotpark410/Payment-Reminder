import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { PaginationComponent } from './Pagination/Pagination';
import { api } from '../../lib/constants';
import DeleteLesson from './DeleteLesson';
import DeleteReset from '../Reset/DeleteReset';
import DeletePayment from '../Payment/DeletePayment';
import EditPayment from '../Payment/EditPayment';
import EditLesson from './EditLesson';
import EditReset from '../Reset/EditReset';
import SentText from '../Text/SentText';
import { formatDate, getTotalPaymentAmount } from '../../lib/util';
import '../../App.css';

export const fetchStudentLessons = async (studentId) => {
  try {
    const response = await api.get(`/lesson/student/${studentId}`);

    // Filter out records with null or invalid date
    const validLessons = response.data.filter((lesson) => {
      return lesson.date !== null && lesson.date !== undefined;
    });

    // Sort the valid records by date
    const sortedLessons = validLessons.sort((a, b) => new Date(a.date) - new Date(b.date));
    console.log("sortedLessons")
    console.log(sortedLessons)
    console.log("formatDate")
    console.log(formatDate(sortedLessons[0].date))

    // Format the sorted lessons
    const formattedLessons = sortedLessons.map((lesson, index) => ({
      ...lesson,
      lesson: true,
      lessonNumber: index + 1,
      formattedDate: formatDate(lesson.date)
    }),
  );


    return formattedLessons;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw error;
  }
};

export const fetchStudentResets = async (studentId) => {
  try {
    // Fetch data from the API
    const response = await api.get(`/reset/student/${studentId}`);

    // Filter out records with null or undefined reset date
    const validResets = response.data.filter(
      (reset) => reset.date !== null && reset.date !== undefined
    );

    // Sort the valid records by reset date
    const sortedResets = validResets.sort((a, b) => new Date(a.date) - new Date(b.date));

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
    const response = await api.get(`/payment/student/${studentId}`);

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
    const response = await api.get(`/text/student/${studentId}`);

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

    return formattedTexts;
  } catch (error) {
    console.error('Error fetching texts:', error);
    throw error;
  }
};

function GetStudentHistory({ studentId, studentName, onClose }) {
  const [lessons, setLessons] = useState([]);
  const [resets, setResets] = useState([]);
  const [texts, setTexts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [showEditLessonModal, setShowEditLessonModal] = useState(false);
  const [showEditResetModal, setShowEditResetModal] = useState(false);
  const [showEditPaymentModal, setShowEditPaymentModal] = useState(false);
  const [editLesson, setEditLesson] = useState(null);
  const [editReset, setEditReset] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [lessonDate, setLessonDate] = useState('');
  const [resetDate, setResetDate] = useState('');
  const [editPayment, setEditPayment] = useState(null);
  const [paymentDate, setPaymentDate] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(null);
  const [showTextModal, setShowTextModal] = useState(false);
  const [textMessage, setTextMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const fetchStudentData = useCallback(async () => {
    const fetchedLessons = await fetchStudentLessons(studentId);
    const fetchedResets = await fetchStudentResets(studentId);
    const fetchedPayments = await fetchStudentPayments(studentId);
    const fetchedTexts = await fetchStudentTexts(studentId);

    const mergedRecords = [
      ...fetchedLessons,
      ...fetchedResets,
      ...fetchedPayments,
      ...fetchedTexts
    ];
    const recordsWithLessonNumbers = assignLessonNumbers(mergedRecords);
    const totalPages = Math.ceil(recordsWithLessonNumbers.length / itemsPerPage);

    setLessons(fetchedLessons);
    setResets(fetchedResets);
    setPayments(fetchedPayments);
    setTexts(fetchedTexts);
    setCurrentPage(totalPages);
  }, [studentId]);

  useEffect(() => {
    fetchStudentData();
  }, [fetchStudentData, studentId]);

  const fetchStudentLessonData = async () => {
    const fetchedLessons = await fetchStudentLessons(studentId);
    console.log("fetchedLessons")
    console.log(fetchedLessons)
    setLessons(fetchedLessons);
  };

  const fetchStudentResetData = async () => {
    const fetchedResets = await fetchStudentResets(studentId);
    setResets(fetchedResets);
  };

  const fetchStudentPaymentData = async () => {
    const fetchedPayments = await fetchStudentPayments(studentId);
    setPayments(fetchedPayments);
  };

  const handleEditLesson = (lesson) => {
    setEditLesson(lesson);
    setLessonDate(new Date(lesson.date).toISOString().slice(0, 10));
    setShowEditLessonModal(true);
    setEditModalOpen(true);
  };

  const handleEditReset = (reset) => {
    setEditReset(reset);
    setResetDate(new Date(reset.date).toISOString().slice(0, 10));
    setShowEditResetModal(true);
    setEditModalOpen(true);
  };

  const handleEditPayment = (payment) => {
    setEditPayment(payment);
    setPaymentDate(new Date(payment.date).toISOString().slice(0, 10));
    setPaymentAmount(payment.amount);
    setShowEditPaymentModal(true);
    setEditModalOpen(true);
  };

  const handleDelete = (itemId, setState) => {
    setState((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== itemId);
      return updatedItems;
    });
  };

  const handleDeleteLesson = (lessonId) => {
    handleDelete(lessonId, setLessons);
  };

  const handleDeleteResets = (resetLessonId) => {
    handleDelete(resetLessonId, setResets);
  };

  const handleDeletePayment = (paymentId) => {
    handleDelete(paymentId, setPayments);
  };

  const handleTextClick = (message) => {
    setTextMessage(message);
    setShowTextModal(true);
    setEditModalOpen(true);
  };

  console.log("lessons")
  console.log(lessons)

  const mergedRecords = [...lessons, ...resets, ...payments, ...texts].sort(
    (a, b) => new Date(a.formattedDate) - new Date(b.formattedDate)
  );
  console.log("mergedRecords")
  console.log(mergedRecords)

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
        return record;
      }
    });
  };

  const recordsWithLessonNumbers = assignLessonNumbers(mergedRecords);
  console.log("recordsWithLessonNumbers")
  console.log(recordsWithLessonNumbers)

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecords = recordsWithLessonNumbers.slice(indexOfFirstItem, indexOfLastItem);
  console.log("currentRecords")
  console.log(currentRecords)

  const totalPages = Math.ceil(recordsWithLessonNumbers.length / itemsPerPage);

  return (
    <Modal
      size="lg"
      show={true}
      onHide={onClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={editModalOpen ? 'modal-disabled' : ''}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{studentName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
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
                    <td className="lesson-data" onClick={() => handleEditLesson(record)}>
                      {record.formattedDate}
                    </td>
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
                        height: '55px'
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
                        borderRadius: '4px'
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
                );
              } else {
                // lesson reset records
                return (
                  <tr key={uniqueKey}>
                    <td
                      colSpan="2"
                      className="reset-data text-center"
                      style={{
                        backgroundColor: '#FFC107', // yellow
                        padding: '8px 15px',
                        borderRadius: '4px'
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
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </Modal.Body>
      <Modal.Footer>
        <div style={{ flex: 1, textAlign: 'left', fontSize: '16px' }}>
          Lessons Completed:{' '}
          <span className="lesson-payment-text">{lessons.length.toLocaleString()}</span>
          <br />
          Payments Received:{' '}
          <span className="lesson-payment-text">{getTotalPaymentAmount(payments)}</span>
        </div>
        <Button className="button" variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>

      {/* Edit Lesson Modal */}
      <EditLesson
        show={showEditLessonModal}
        onHide={() => {
          setShowEditLessonModal(false);
          setEditModalOpen(false);
        }}
        lesson={editLesson}
        lessonDate={lessonDate}
        setLessonDate={setLessonDate}
        setEditLesson={setEditLesson}
        fetchStudentLessonData={fetchStudentLessonData}
      />

      {/* Edit Reset Modal */}
      <EditReset
        show={showEditResetModal}
        onHide={() => {
          setShowEditResetModal(false);
          setEditModalOpen(false);
        }}
        reset={editReset}
        resetDate={resetDate}
        setResetDate={setResetDate}
        setEditReset={setEditReset}
        fetchStudentResetData={fetchStudentResetData}
      />

      {/* Edit Payment Modal */}
      <EditPayment
        show={showEditPaymentModal}
        onHide={() => {
          setShowEditPaymentModal(false);
          setEditModalOpen(false);
        }}
        payment={editPayment}
        paymentDate={paymentDate}
        paymentAmount={paymentAmount}
        setPaymentDate={setPaymentDate}
        setPaymentAmount={setPaymentAmount}
        setEditPayment={setEditPayment}
        fetchStudentPaymentData={fetchStudentPaymentData}
      />

      {/* Display Sent Text Modal */}
      <SentText
        show={showTextModal}
        onHide={() => {
          setShowTextModal(false);
          setEditModalOpen(false);
        }}
        textMessage={textMessage}
      />
    </Modal>
  );
}

export default GetStudentHistory;
