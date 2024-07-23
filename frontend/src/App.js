import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDashboard from './components/userDash';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<UserDashboard />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
