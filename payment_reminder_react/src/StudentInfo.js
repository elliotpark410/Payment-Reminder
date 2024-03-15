import React, { useState, useEffect } from 'react';
import { host } from './lib/constants'

function StudentInfo() {
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    // Fetch student data from the server
    fetch(`${host}/student/`)
      .then(response => response.json())
      .then(data => setStudentData(data))
      .catch(error => console.error('Error fetching student data:', error));
  }, []);

  return (
    <div>
      {studentData ? (
        studentData.map((student, index) => (
          <div key={index} className="grid-item">
            <p>Student Name: {student.student_name}</p>
            <p>Parent Name: {student.parent_name}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default StudentInfo;