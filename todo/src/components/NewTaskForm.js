// NewTaskForm.js
import React, { useState } from 'react';
import './NewTaskForm'

const NewTaskForm = ({ statuses, addNewTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [statusId, setStatusId] = useState(statuses[0].id);

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewTask(title, description, statusId);
    setTitle('');
    setDescription('');
    setStatusId(statuses[0].id);
  };

  return (
    <div className="new-task-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <select
          value={statusId}
          onChange={(e) => setStatusId(e.target.value)}
        >
          {statuses.map((status) => (
            <option key={status.id} value={status.id}>
              {status.title}
            </option>
          ))}
        </select>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default NewTaskForm;
