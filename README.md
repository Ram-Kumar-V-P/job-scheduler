# Job Scheduler

## Description
A job scheduler application using Node.js (Express) for the backend and React for the frontend. The backend uses the Shortest Job First (SJF) scheduling algorithm and communicates real-time updates to the frontend using WebSockets.

## How to Run

### Backend (Node.js)
1. Install dependencies: `npm install`
2. Start the server: `node server.js`

### Frontend (React)
1. Navigate to the `client` directory: `cd client`
2. Install dependencies: `npm install`
3. Start the React app: `npm start`

## Design Choices
- **SJF Scheduling**: Prioritizes jobs based on shortest duration.
- **WebSocket**: Provides real-time job status updates.
- **React Components**: Separate components for job list and form submission.
