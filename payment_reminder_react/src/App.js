// App.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { host } from './lib/constants';
import EditStudent from './EditStudent';
import AddStudent from './AddStudent';
import DeleteStudent from './DeleteStudent';
import GetStudentLessons from './GetStudentLessons';
import GetAllLessons from './GetAllLessons';


function App() {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteStudent, setDeleteStudent] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [showAllLessons, setShowAllLessons] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${host}/student/`);
      const data = await response.json();
      // Sort the students array alphabetically by student name
      const sortedStudents = data.sort((a, b) => a.student_name.localeCompare(b.student_name));
      setStudents(sortedStudents);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEditClick = (student) => {
    setEditStudent(student);
    setShowEditForm(true);
  };

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleAddStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  const handleDeleteClick = (student) => {
    setDeleteStudent(student);
  };

  const handlePlusClick = (index) => {
    console.log('Plus clicked for student', index);
  };

  const handleMinusClick = (index) => {
    console.log('Minus clicked for student', index);
  };

  const handleLessonNumberChange = (index) => {
    console.log('Lesson number change clicked for student', index);
  };

  const handleStudentLessonsClick = (student) => {
    setStudentId(student.id); // Set selected student ID for history
  };

  const handleCloseHistory = () => {
    setStudentId(null); // Clear selected student ID for history
  };

  const handleReminderClick = (student) => {
    console.log('Sending reminder for student', student);
  };

  const handleAllLessons = async () => {
    setShowAllLessons(true);
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col className="text-center">
          <h1>Payment Reminder</h1>
        </Col>
        <Col className="text-left">
          <Button variant="primary" onClick={handleAddClick}>Add Student</Button>
        </Col>
        <Col className="text-left">
          <Button variant="secondary" onClick={handleAllLessons}>
            All Lessons
          </Button>
        </Col>
      </Row>
      {students.map((student, index) => (
        <Row className="mt-3" key={student.id} style={{ borderBottom: index !== students.length - 1 ? '1px solid #ccc' : 'none' }}>
          <Col>
            <div onClick={()=> handleEditClick(student)} style={{ padding: '10px', cursor: 'pointer' }}>
              <p>Student: {student.student_name}</p>
              <p className="ml-3">Parent: {student.parent_name}</p>
            </div>
          </Col>
          <Col>
            <div className="d-flex align-items-center">
              <Button
                variant="outline-secondary"
                onClick={() => handleMinusClick(index)}
              >
                -
              </Button>

              <input
                type="text"
                className="form-control"
                style={{ width: '40px', margin: '0 10px' }}
                value={student.lessonNumber}
                onChange={(e) =>
                  handleLessonNumberChange(e.target.value, index)
                }
              />
              <Button
                variant="outline-secondary"
                onClick={() => handlePlusClick(index)}
              >
                +
              </Button>
            </div>
          </Col>

          <Col>
            <div>
              <Button
                variant="outline-primary"
                onClick={() => handleStudentLessonsClick(student)}
              >
                View Lessons
              </Button>
            </div>
          </Col>
          <Col>
            <div>
              <Button
                variant="outline-success"
                onClick={() => handleReminderClick(student)}
              >
                Send Reminder
              </Button>
            </div>
          </Col>
          <Col>
            <div>
              <Button
                variant="outline-danger"
                onClick={() => handleDeleteClick(student)}
              >
                 <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          </Col>

        </Row>
      ))}

      {showEditForm && (
        <EditStudent
          student={editStudent}
          onClose={() => setShowEditForm(false)}
        />
      )}

      {showAddForm && (
        <AddStudent
          onClose={() => setShowAddForm(false)}
          onAdd={handleAddStudent}
        />
      )}

      {deleteStudent && (
        <DeleteStudent
          student={deleteStudent}
          onCancel={() => setDeleteStudent(null)}
          onDelete={(deletedStudentId) => {
            // Remove the deleted student from the state
            const updatedStudents = students.filter(student => student.id !== deletedStudentId);
            setStudents(updatedStudents);
            setDeleteStudent(null); // Close the modal after deleting
          }}
        />
      )}

      {/* Conditional rendering of GetStudentLessons component */}
      {studentId && (
        <GetStudentLessons
          studentId={studentId}
          onClose={handleCloseHistory}
        />
      )}

      {/* Conditional rendering of GetAllLessons component */}
      {showAllLessons && (
        <GetAllLessons
          onClose={() => setShowAllLessons(false)}
        />
      )}
    </Container>
  );
}

export default App;
