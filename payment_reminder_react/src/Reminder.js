import React from 'react';

function Reminder() {
  const sendTextReminder = () => {
    // Logic to send text reminder
  };

  return (
    <div className="reminder">
      <h2>Reminder</h2>
      <button onClick={sendTextReminder}>Send Text</button>
    </div>
  );
}

export default Reminder;
