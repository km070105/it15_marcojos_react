import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// These paths must match the folder structure exactly
import Login from './assets/components/Login/Login.jsx';
import Dashboard from './assets/components/Dashboard/Dashboard.jsx';

// Global Styles
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Landing page shows the Login component */}
          <Route path="/" element={<Login />} />

          {/* After login, the user is sent here */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* If the user types a random URL, send them back to Login */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;