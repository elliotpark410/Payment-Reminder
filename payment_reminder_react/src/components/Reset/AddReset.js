// AddReset.js
import React from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { host } from '../../lib/constants';
import { formatDate } from '../../lib/util';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

function AddReset({ studentId, selectedDate, fetchStudentResetData, onUpdate }) {
  const resetLessonCount = async () => {
    try {
      const formattedDate = selectedDate.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });

      const notificationDate = formatDate(selectedDate);

      const response = await axios.post(`${host}/reset/add`, {
        student_id: studentId,
        date: formattedDate
      });

      if (response.status === 200 || 201) {
        toast.warning(`Lesson reset ${notificationDate}`, {
          position: "top-left",
          autoClose: 3000
        });
        fetchStudentResetData();
        onUpdate();
      } else {
        console.error('Error resetting lesson count. Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error resetting lesson count:', error);
      throw error;
    }
  };

  return (
    <Button
      className="button"
      variant="warning"
      title="Reset lesson count"
      onClick={resetLessonCount}
    >
      <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '0.5em' }} />
      Reset
    </Button>
  );
}

export default AddReset;
