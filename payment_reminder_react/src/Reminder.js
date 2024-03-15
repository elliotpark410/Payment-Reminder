import React, { useState, useEffect } from 'react';

function StudentInfo() {
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    // Fetch student data from the server
    fetch('/api/student')
      .then(response => response.json())
      .then(data => setStudentData(data))
      .catch(error => console.error('Error fetching student data:', error));
  }, []);

  return (
    <div className="student-info">
      {studentData ? (
        <>
          <p>Student Name: {studentData.studentName}</p>
          <p>Parent Name: {studentData.parentName}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <button>Edit</button>
    </div>
  );
}

export default StudentInfo;
