import React, { useState, useEffect } from 'react';

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();

    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const updatedJobs = JSON.parse(event.data);
      setJobs(updatedJobs);
    };

    return () => ws.close();
  }, []);

  const fetchJobs = async () => {
    const response = await fetch('http://localhost:8080/jobs');
    const data = await response.json();
    setJobs(data);
  };

  return (
    <div>
      <h2>Job List</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            {job.name} - {job.status} ({job.duration}s)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobList;
