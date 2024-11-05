import React, { useState } from 'react';

function JobForm() {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch('http://localhost:8080/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, duration: parseFloat(duration) })
    });
    setName('');
    setDuration('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Job Name"
        required
      />
      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Duration (seconds)"
        required
      />
      <button type="submit">Add Job</button>
    </form>
  );
}

export default JobForm;
