import React from 'react';
import './TaskCard.css';

const TaskCard = ({ task, index }) => {
  return (
    <div className="task-card">
      <p>{task.title}</p>
      <p>{task.description}</p>
    </div>
  );
};

export default TaskCard;
