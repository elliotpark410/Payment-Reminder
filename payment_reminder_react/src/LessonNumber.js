import React, { useState } from 'react';

function LessonNumber() {
  const [lessonCount, setLessonCount] = useState(0);

  const incrementLesson = () => {
    setLessonCount(lessonCount + 1);
  };

  const decrementLesson = () => {
    if (lessonCount > 0) {
      setLessonCount(lessonCount - 1);
    }
  };

  return (
    <div className="lesson-number">
      <button onClick={decrementLesson}>-</button>
      <span>{lessonCount}</span>
      <button onClick={incrementLesson}>+</button>
    </div>
  );
}

export default LessonNumber;
