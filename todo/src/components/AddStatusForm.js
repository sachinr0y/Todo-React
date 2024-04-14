// AddStatusForm.js
import React, { useState } from 'react';


const AddStatusForm = ({ addNewStatus }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewStatus(title);
    setTitle('');
  };

  return (
    <div className="add-status-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Status Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit">Add Status</button>
      </form>
    </div>
  );
};

export default AddStatusForm;
