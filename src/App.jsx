import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BudgetDashboard from './components/BudgetDashboard';
import './styles/custom.css';

function App() {
  return (
    <Router basename="/Planifio">
      <Routes>
        <Route path="/" element={<BudgetDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
