import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { api } from '../../lib/constants';
import '../../App.css';

const fetchInactiveStudents = async (setInactiveStudents) => {
  try {
    const response = await api.get(`/student/inactive`);

    // Sort students alphabetically by their names
    const sortedStudents = response.data.sort((a, b) =>
      a.student_name.localeCompare(b.student_name)
    );

    // Format the students
    const formattedStudents = sortedStudents.map((student, index) => ({
      ...student,
      number: index + 1
    }));

    // Set the filtered and formatted lessons
    setInactiveStudents(formattedStudents);
  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw error;
  }
};

const handleActivateStudent = async (studentId, studentName) => {
  try {
    // console.log(`Activating ${studentName}`);
    const response = await api.put(`/student/inactive/${studentId}`);

    if (response.status === 200 || 201) {
      // Show notifcation
      toast.success(`Activated ${studentName}`, {
        position: "top-left",
        autoClose: 3000 // Close after 3 seconds
      });
    } else {
      console.error('Error activating student. Unexpected response: ', response);
    }
  } catch (error) {
    console.error('Error activating student: ', error);
    throw error;
  }
};

function InactiveStudents({ onActivate, onClose }) {
  const [inactiveStudents, setInactiveStudents] = useState([]);

  useEffect(() => {
    fetchInactiveStudents(setInactiveStudents);
  }, []);

  return (
    <Modal
      size="lg"
      show={true}
      onHide={onClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Inactive Students</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table">
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th style={{ paddingLeft: '70px' }}>Activate</th>
            </tr>
          </thead>
          <tbody>
            {inactiveStudents.map((student) => {
              return (
                <tr key={student.number}>
                  <td>{student.number}</td>
                  <td>{student.student_name}</td>
                  <td style={{ paddingLeft: '70px' }}>
                    <Form.Check
                      type="checkbox"
                      defaultChecked={false}
                      onChange={() => handleActivateStudent(student.id, student.student_name)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button className="button" variant="primary" onClick={onActivate}>
          Save
        </Button>
        <Button className="button" variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default InactiveStudents;
