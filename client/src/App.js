import './App.css';
import JobForm from './JobForm';
import JobList from './JobList';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Job Scheduler</h1>
      </header>
      <div>
        <JobForm />
        <JobList />
      </div>
    </div>
  );
}

export default App;
