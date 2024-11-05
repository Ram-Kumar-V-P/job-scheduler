const express = require('express');
const { WebSocketServer } = require('ws');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

let jobs = [];
let clients = [];

// Define a Job class with properties
class Job {
    constructor(name, duration) {
        this.id = uuidv4();
        this.name = name;
        this.duration = duration;
        this.status = 'pending';
    }
}

// SJF Scheduling: Sort jobs by duration
function sortJobsByDuration() {
    jobs.sort((a, b) => a.duration - b.duration);
}

// Add job to list and broadcast update
function addJob(name, duration) {
    const job = new Job(name, duration);
    jobs.push(job);
    sortJobsByDuration();
    broadcast();
    processJob(job);
}

// Execute job in the order determined by SJF
async function processJob(job) {
    job.status = 'running';
    broadcast();
    await new Promise(resolve => setTimeout(resolve, job.duration * 1000)); // Simulate duration
    job.status = 'completed';
    broadcast();
}

// Broadcast job updates to all WebSocket clients
function broadcast() {
    const data = JSON.stringify(jobs);
    clients.forEach(ws => ws.send(data));
}

// REST API to submit and retrieve jobs
app.post('/jobs', (req, res) => {
    const { name, duration } = req.body;
    addJob(name, parseFloat(duration));
    res.status(201).send({ message: 'Job submitted successfully' });
});

app.get('/jobs', (req, res) => {
    res.json(jobs);
});

app.get('/', (req, res) => {
    res.send('Server is running...');
});

// WebSocket server setup
const wss = new WebSocketServer({ noServer: true });

wss.on('connection', ws => {
    clients.push(ws);
    ws.send(JSON.stringify(jobs));

    ws.on('close', () => {
        clients = clients.filter(client => client !== ws);
    });
});

const server = app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));

// Upgrade HTTP to WebSocket for /ws endpoint
server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, ws => {
        wss.emit('connection', ws, request);
    });
});
