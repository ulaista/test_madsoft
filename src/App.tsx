import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TestForm } from './components/TestForm';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestForm />} />
      </Routes>
    </Router>
  );
};

export default App;
