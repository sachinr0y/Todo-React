// TaskDetailsPage.js
import React from 'react';
import './TaskDetailsPage'

const TaskDetailsPage = ({ task, updateTask, deleteTask }) => {
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    updateTask({ ...task, title: newTitle });
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    updateTask({ ...task, status: newStatus });
  };

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    updateTask({ ...task, description: newDescription });
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };


  return (
    <div className="task-details">
      <input
        type="text"
        value={task.title}
        onChange={handleTitleChange}
        required
      />
      <select value={task.status} onChange={handleStatusChange}>
        <option value="todo">To Do</option>
        <option value="inProgress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <textarea
        value={task.description}
        onChange={handleDescriptionChange}
        required
      ></textarea>
      <button onClick={handleDelete}>Delete Task</button>
    </div>
  );
};

export default TaskDetailsPage;
